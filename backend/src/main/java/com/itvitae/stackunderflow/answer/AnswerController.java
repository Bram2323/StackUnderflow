package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.exceptions.BadRequestException;
import com.itvitae.stackunderflow.exceptions.NotFoundException;
import com.itvitae.stackunderflow.useranswervote.AnswerVoteDTO;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVote;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVoteRepository;
import com.itvitae.stackunderflow.question.Question;
import com.itvitae.stackunderflow.question.QuestionRepository;
import com.itvitae.stackunderflow.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("answers")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class AnswerController {
    private final AnswerRepository answerRepository;
    private final UserAnswerVoteRepository userAnswerVoteRepository;
    private final QuestionRepository questionRepository;

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

    @GetMapping("{id}")
    private AnswerDTO get(@PathVariable Long id) {
        Optional<Answer> possibleAnswer = answerRepository.findById(id);
        if (possibleAnswer.isEmpty())
            throw new NotFoundException();
        return AnswerDTO.from(possibleAnswer.get());
    }

    @PostMapping
    private ResponseEntity<AnswerDTO> create(@RequestBody PostAnswerDTO answerDTO, UriComponentsBuilder ucb,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Long questionId = answerDTO.question();
        String text = answerDTO.text();
        LocalDateTime date = LocalDateTime.now();

        if (questionId == null)
            throw new BadRequestException("Question needs to be defined!");
        Optional<Question> possibleQuestion = questionRepository.findById(questionId);
        if (possibleQuestion.isEmpty())
            throw new BadRequestException("Question doesn't exist!");
        Question question = possibleQuestion.get();
        if (text == null || text.isBlank())
            throw new BadRequestException("Text needs to be defined!");
        String trimmedText = text.trim();

        Answer answer = new Answer(trimmedText, date, question, user);
        Answer savedAnswer = answerRepository.save(answer);

        URI path = ucb.path("/answers/{id}").buildAndExpand(savedAnswer.getId()).toUri();
        return ResponseEntity.created(path).body(AnswerDTO.from(savedAnswer));
    }
}
