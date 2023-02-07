package com.alppano.speakon.domain.resume.service;

import com.alppano.speakon.common.exception.BadRequestException;
import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.DataFileUtil;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.datafile.repository.DataFileRepository;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.resume.dto.ResumeInfo;
import com.alppano.speakon.domain.resume.entity.Resume;
import com.alppano.speakon.domain.resume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final DataFileRepository dataFileRepository;
    private final InterviewJoinRepository interviewJoinRepository;
    private final DataFileUtil dataFileUtil;

    @Transactional
    public void registerResume(Long userId, Long interviewJoinId, MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new BadRequestException("요청에 자기소개서 파일이 존재하지 않습니다.");
        }

        InterviewJoin interviewJoin = interviewJoinRepository.findById(interviewJoinId).orElseThrow(
                () -> new ResourceNotFoundException("당신은 존재하지 않는 면접 참여자입니다.")
        );

        if (interviewJoin.getUser().getId().equals(userId)) {
            throw new ResourceForbiddenException("다른 참여자의 자기소개서는 등록할 수 없습니다.");
        }

        if (resumeRepository.findByInterviewJoinId(interviewJoinId).isPresent()) {
            throw new ResourceAlreadyExistsException("자기소개서는 하나만 등록할 수 있습니다.");
        }

        DataFile dataFile = dataFileUtil.storeFile(multipartFile);

        dataFileRepository.save(dataFile);

        Resume resume = Resume.builder()
                .interviewJoin(interviewJoin)
                .dataFile(dataFile)
                .build();

        resumeRepository.save(resume);
    }

    public ResumeInfo getResume(Long userId, Long interviewJoinId) {
        InterviewJoin interviewJoin = interviewJoinRepository.findById(interviewJoinId).orElseThrow(
                () -> new ResourceNotFoundException("당신은 존재하지 않는 면접 참여자입니다.")
        );

        interviewJoinRepository.findByUserIdAndInterviewRoomId(userId, interviewJoin.getInterviewRoom().getId()).orElseThrow(
                () -> new ResourceForbiddenException("해당 면접방에 참여 중이 아닙니다.")
        );

        Resume resume = resumeRepository.findByInterviewJoinId(interviewJoinId).orElseThrow(
                () -> new ResourceNotFoundException("등록된 자기소개서가 없습니다.")
        );

        String uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/datafiles/")
                .path(Long.toString(resume.getDataFile().getId()))
                .toUriString();

        return new ResumeInfo(resume.getId(), uri);
    }

    @Transactional
    public void deleteResume(Long userId, Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId).orElseThrow(
                () -> new ResourceNotFoundException("등록된 자기소개서가 없습니다.")
        );

        InterviewJoin interviewJoin = resume.getInterviewJoin();

        if (interviewJoin.getUser().getId() != userId) {
            throw new ResourceForbiddenException("자신의 자기소개서만 삭제할 수 있습니다.");
        }

        dataFileUtil.deleteFile(resume.getDataFile());
        interviewJoin.setResume(null);
        resumeRepository.delete(resume);
        dataFileRepository.delete(resume.getDataFile());
    }

    @Transactional
    public void updateResume(Long userId, Long resumeId, MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new BadRequestException("요청에 자기소개서 파일이 존재하지 않습니다.");
        }

        Resume resume = resumeRepository.findById(resumeId).orElseThrow(
                () -> new ResourceNotFoundException("등록된 자기소개서가 없습니다.")
        );

        if (resume.getInterviewJoin().getUser().getId().equals(userId)) {
            throw new ResourceForbiddenException("자신의 자기소개서만 수정할 수 있습니다.");
        }

        DataFile temp = resume.getDataFile();
        dataFileUtil.deleteFile(temp);
        dataFileRepository.delete(temp);

        DataFile dataFile = dataFileUtil.storeFile(multipartFile);
        dataFileRepository.save(dataFile);

        resume.setDataFile(dataFile);
    }

}
