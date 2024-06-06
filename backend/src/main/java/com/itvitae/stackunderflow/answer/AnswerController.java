package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.exceptions.BadRequestException;
import com.itvitae.stackunderflow.exceptions.NotFoundException;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.useranswervote.AnswerVoteDTO;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVote;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("answers")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class AnswerController {
    private final AnswerRepository answerRepository;
    private final UserAnswerVoteRepository userAnswerVoteRepository;

    @PatchMapping("{id}/votes")
    public ResponseEntity<AnswerDTO> addVote(@PathVariable Long id, @RequestBody AnswerVoteDTO answerVoteDTO, Authentication authentication) {
        if (answerVoteDTO.isUpVote() == null || answerVoteDTO.isDownVote() == null) {
            throw new BadRequestException("Upvote and downvote need to be defined");
        }
        User user = (User) authentication.getPrincipal();
        Optional<Answer> possiblyExistingAnswer = answerRepository.findById(id);
        if (possiblyExistingAnswer.isEmpty()) {
            throw new NotFoundException();
        }
        Answer answer = possiblyExistingAnswer.get();

        if (answerVoteDTO.isUpVote() && answerVoteDTO.isDownVote()) {
            throw new BadRequestException("Can't upvote and downvote at the same time");
        }

        Optional<UserAnswerVote> possibleUserAnswerVote = userAnswerVoteRepository.findByAnswerAndUser(answer, user);

        if (!answerVoteDTO.isDownVote() && !answerVoteDTO.isUpVote()) {
            possibleUserAnswerVote.ifPresent(userAnswerVoteRepository::delete);
            return ResponseEntity.ok(AnswerDTO.from(answer, user));
        }

        UserAnswerVote userAnswerVote = possibleUserAnswerVote.orElseGet(() -> new UserAnswerVote(user, answer, false));
        userAnswerVote.setIsUpvote(answerVoteDTO.isUpVote());
        userAnswerVoteRepository.save(userAnswerVote);

//        Answer updatedAnswer = answerRepository.findById(id).get();
        return ResponseEntity.ok(AnswerDTO.from(answer, user));
    }
}
