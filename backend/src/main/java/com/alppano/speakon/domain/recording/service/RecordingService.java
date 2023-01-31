package com.alppano.speakon.domain.recording.service;

import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.DataFileUtil;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.datafile.repository.DataFileRepository;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.recording.entity.Recording;
import com.alppano.speakon.domain.recording.repository.RecordingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecordingService {

    private final RecordingRepository recordingRepository;
    private final DataFileRepository dataFileRepository;
    private final InterviewJoinRepository interviewJoinRepository;
    private final DataFileUtil dataFileUtil;

    @Transactional
    public void registerRecording(Long userId, Long interviewJoinId, MultipartFile multipartFile) throws IOException {
        InterviewJoin interviewJoin = interviewJoinRepository.findById(interviewJoinId).orElseThrow(
                ()-> new ResourceNotFoundException("당신은 존재하지 않는 면접 참여자입니다.")
        );

        if(interviewJoin.getUser().getId() != userId) {
            throw new ResourceForbiddenException("다른 참여자의 면접 녹음은 등록할 수 없습니다.");
        }

        if(recordingRepository.findByInterviewJoinId(interviewJoinId).isPresent()) {
            throw new ResourceAlreadyExistsException("면접 녹음은 하나만 등록할 수 있습니다.");
        }

        DataFile dataFile = dataFileUtil.storeFile(multipartFile);

        dataFileRepository.save(dataFile);

        Recording recording = Recording.builder()
                .interviewJoin(interviewJoin)
                .dataFile(dataFile)
                .build();

        recordingRepository.save(recording);
    }
}
