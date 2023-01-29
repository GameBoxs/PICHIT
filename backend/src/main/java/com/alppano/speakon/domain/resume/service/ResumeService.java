package com.alppano.speakon.domain.resume.service;

import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.DataFileUtil;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.datafile.repository.DataFileRepository;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.resume.entity.Resume;
import com.alppano.speakon.domain.resume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
        InterviewJoin interviewJoin = interviewJoinRepository.findById(interviewJoinId).orElseThrow(
                ()-> new ResourceNotFoundException("당신은 존재하지 않는 면접 참여자입니다.")
        );

        if(interviewJoin.getUser().getId() != userId) {
            throw new ResourceForbiddenException("다른 참여자의 자기소개서는 등록할 수 없습니다.");
        }

        if(resumeRepository.findByInterviewJoinId(interviewJoinId).isPresent()) {
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
}
