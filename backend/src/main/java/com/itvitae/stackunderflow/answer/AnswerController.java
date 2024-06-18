package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.exceptions.BadRequestException;
import com.itvitae.stackunderflow.exceptions.ForbiddenException;
import com.itvitae.stackunderflow.exceptions.NotFoundException;
import com.itvitae.stackunderflow.question.Question;
import com.itvitae.stackunderflow.question.QuestionRepository;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserService;
import com.itvitae.stackunderflow.useranswervote.AnswerVoteDTO;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVote;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVoteRepository;
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
    private final UserService userService;

    public static final int MAX_TEXT_CHARACTERS = 30000;

    @PatchMapping("{id}")
    public ResponseEntity<AnswerDTO> patch(@PathVariable Long id, @RequestBody AnswerDTO answerDTO,
                                           Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Answer> possibleAnswer = answerRepository.findByIdAndEnabledTrue(id);
        Answer answer = possibleAnswer.orElseThrow(NotFoundException::new);

        Question question = answer.getQuestion();
        User questionOwner = question.getUser();
        User answerOwner = answer.getUser();

        if (!user.equals(questionOwner) && !user.equals(answerOwner))
            throw new ForbiddenException();

        Boolean isSolution = answerDTO.isSolution();
        if (isSolution != null) {
            if (!user.equals(questionOwner))
                throw new ForbiddenException();
            answer.setIsSolution(isSolution);
        }

        String text = answerDTO.text();
        if (text != null) {
            if (!user.equals(answerOwner))
                throw new ForbiddenException();
            if (text.length() > MAX_TEXT_CHARACTERS)
                throw new BadRequestException("Text can't be longer than " + MAX_TEXT_CHARACTERS + "characters");
            answer.setText(text);
            answer.setLastEdited(LocalDateTime.now());
        }
        
        Answer updatedAnswer = answerRepository.save(answer);
        return ResponseEntity.ok(AnswerDTO.from(updatedAnswer, user));
    }

    @PatchMapping("{id}/votes")
    public ResponseEntity<AnswerDTO> addVote(@PathVariable Long id, @RequestBody AnswerVoteDTO answerVoteDTO,
                                             Authentication authentication) {
        if (answerVoteDTO.isUpVote() == null || answerVoteDTO.isDownVote() == null) {
            throw new BadRequestException("Upvote or down vote needs to be defined");
        }
        User user = (User) authentication.getPrincipal();
        Optional<Answer> possiblyExistingAnswer = answerRepository.findById(id);
        Answer answer = possiblyExistingAnswer.orElseThrow(NotFoundException::new);

        if (answerVoteDTO.isUpVote() && answerVoteDTO.isDownVote()) {
            throw new BadRequestException("Can't upvote and down vote at the same time");
        }

        Optional<UserAnswerVote> possibleUserAnswerVote = userAnswerVoteRepository.findByAnswerAndUser(answer, user);

        if (!answerVoteDTO.isDownVote() && !answerVoteDTO.isUpVote()) {
            possibleUserAnswerVote.ifPresent(userAnswerVoteRepository::delete);
            return ResponseEntity.ok(AnswerDTO.from(answer, user));
        }

        UserAnswerVote userAnswerVote = possibleUserAnswerVote.orElseGet(() -> new UserAnswerVote(user, answer, false));
        userAnswerVote.setIsUpvote(answerVoteDTO.isUpVote());
        userAnswerVoteRepository.save(userAnswerVote);

        return ResponseEntity.ok(AnswerDTO.from(answer, user));
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
        Optional<Question> possibleQuestion = questionRepository.findByIdAndEnabledTrue(questionId);
        if (possibleQuestion.isEmpty())
            throw new BadRequestException("Question doesn't exist!");
        Question question = possibleQuestion.get();
        if (text == null || text.isBlank())
            throw new BadRequestException("Text needs to be defined!");

        if (text.length() > MAX_TEXT_CHARACTERS)
            throw new BadRequestException("Text can't be longer than " + MAX_TEXT_CHARACTERS + "characters");

        Answer answer = new Answer(text, date, question, user);
        Answer savedAnswer = answerRepository.save(answer);

        URI path = ucb.path("/answers/{id}").buildAndExpand(savedAnswer.getId()).toUri();
        return ResponseEntity.created(path).body(AnswerDTO.from(savedAnswer, user));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Answer> possibleAnswer = answerRepository.findByIdAndEnabledTrue(id);
        Answer answer = possibleAnswer.orElseThrow(NotFoundException::new);

        User answerOwner = answer.getUser();
        if (!user.equals(answerOwner) && !userService.isAdmin(user)) {
            throw new ForbiddenException();
        }
        answer.setEnabled(false);
        answerRepository.save(answer);
        return ResponseEntity.noContent().build();
    }
}
