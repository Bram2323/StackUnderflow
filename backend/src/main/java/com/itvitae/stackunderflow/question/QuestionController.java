package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.answer.AnswerDTO;
import com.itvitae.stackunderflow.answer.AnswerRepository;
import com.itvitae.stackunderflow.exceptions.BadRequestException;
import com.itvitae.stackunderflow.exceptions.ForbiddenException;
import com.itvitae.stackunderflow.exceptions.NotFoundException;
import com.itvitae.stackunderflow.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

@CrossOrigin(origins = "${stackunderflow.cors}")
@RestController
@RequiredArgsConstructor
@RequestMapping("questions")
public class QuestionController {
    public static final int questionsPerPage = 15;
    public static final int answersPerPage = 30;

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @GetMapping
    public Page<QuestionMinimalDTO> getAllQuestions(@RequestParam(required = false, name = "page") Integer pageParam,
                                                    Authentication authentication) {
        int page = pageParam == null ? 0 : pageParam - 1;
        Pageable pageable = PageRequest.of(page, questionsPerPage, Sort.by("date").descending());

        User user = authentication == null ? null : (User) authentication.getPrincipal();

        Page<Question> allQuestions = questionRepository.findAllByEnabledTrue(pageable);
        return allQuestions.map(question -> QuestionMinimalDTO.from(question, user));
    }

    @GetMapping("/own")
    public Page<QuestionMinimalDTO> getAllQuestionsByUser(@RequestParam(required = false) String title,
                                                          @RequestParam(name = "order-by", required = false) String orderBy,
                                                          @RequestParam(required = false, name = "page") Integer pageParam,
                                                          Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        int page = pageParam == null ? 0 : pageParam - 1;
        Sort sort = switch (orderBy != null ? orderBy : "") {
            default -> Sort.by("date").descending();
            case "date-asc" -> Sort.by("date").ascending();
            case "most-answers" -> Sort.by("answerCount").descending().and(Sort.by("date").descending());
            case "least-answers" -> Sort.by("answerCount").ascending().and(Sort.by("date").descending());
        };
        Pageable pageable = PageRequest.of(page, questionsPerPage, sort);

        Page<Question> questions = questionRepository.findByUserIdAndTitleContainsIgnoreCaseAndEnabledTrue(user.getId(),
                title != null ? title : "", pageable);
        return questions.map(question -> QuestionMinimalDTO.from(question, user));
    }

    @GetMapping("search")
    public Page<QuestionMinimalDTO> search(@RequestParam(required = false) String title,
                                           @RequestParam(name = "order-by", required = false) String orderBy,
                                           @RequestParam(required = false, name = "page") Integer pageParam,
                                           Authentication authentication) {
        int page = pageParam == null ? 0 : pageParam - 1;
        Sort sort = switch (orderBy != null ? orderBy : "") {
            default -> Sort.by("date").descending();
            case "date-asc" -> Sort.by("date").ascending();
            case "most-answers" -> Sort.by("answerCount").descending().and(Sort.by("date").descending());
            case "least-answers" -> Sort.by("answerCount").ascending().and(Sort.by("date").descending());
        };
        Pageable pageable = PageRequest.of(page, questionsPerPage, sort);

        User user = authentication == null ? null : (User) authentication.getPrincipal();

        Page<Question> questions = questionRepository
                .findByTitleContainsIgnoreCaseAndEnabledTrue(title != null ? title : "", pageable);
        return questions.map(question -> QuestionMinimalDTO.from(question, user));
    }

    @GetMapping("{id}")
    public QuestionDTO getQuestionById(@PathVariable long id, Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();

        Optional<Question> possiblyExistingQuestion = questionRepository.findByIdAndEnabledTrue(id);
        if (possiblyExistingQuestion.isEmpty()) {
            throw new NotFoundException();
        }
        Question question = possiblyExistingQuestion.get();
        return QuestionDTO.from(question, user);
    }

    @GetMapping("{id}/answers")
    public Page<AnswerDTO> getAnswersFromQuestion(@PathVariable long id,
                                                  @RequestParam(required = false, name = "page") Integer pageParam, Authentication authentication) {
        Optional<Question> possibleQuestion = questionRepository.findById(id);
        Question question = possibleQuestion.orElseThrow(NotFoundException::new);

        User user = authentication == null ? null : (User) authentication.getPrincipal();

        int page = pageParam == null ? 0 : pageParam - 1;
        Pageable pageable = PageRequest.of(page, answersPerPage,
                Sort.by("isSolution").descending().and(
                        Sort.by("voteCount").descending().and(
                                Sort.by("date").ascending())));

        Page<Answer> answers = answerRepository.findByQuestionAndEnabledTrue(question, pageable);
        return answers.map(answer -> AnswerDTO.from(answer, user));
    }

    @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(@RequestBody PostPatchQuestionDTO postPatchQuestionDTO,
                                                      UriComponentsBuilder ucb, Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        if (postPatchQuestionDTO.title() == null || postPatchQuestionDTO.title().isBlank()) {
            throw new BadRequestException("Title can't be null");
        }
        if (postPatchQuestionDTO.text() == null || postPatchQuestionDTO.text().isBlank()) {
            throw new BadRequestException("Text can't be null");
        }
        Question newQuestion = new Question(postPatchQuestionDTO.title(), postPatchQuestionDTO.text(),
                LocalDateTime.now(), user);
        questionRepository.save(newQuestion);

        URI locationOfNewQuestion = ucb.path("questions/{id}").buildAndExpand(newQuestion.getId()).toUri();
        return ResponseEntity.created(locationOfNewQuestion).body(QuestionDTO.from(newQuestion, user));
    }

    @PatchMapping("{id}")
    public QuestionDTO editQuestion(@PathVariable Long id, @RequestBody PostPatchQuestionDTO postPatchQuestionDTO,
                                    Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Optional<Question> possibleQuestion = questionRepository.findByIdAndEnabledTrue(id);
        Question question = possibleQuestion.orElseThrow(NotFoundException::new);

        User questionOwner = question.getUser();
        if (!user.equals(questionOwner)) {
            throw new ForbiddenException();
        }

        if (postPatchQuestionDTO.title() != null) {
            question.setTitle(postPatchQuestionDTO.title());
        }
        if (postPatchQuestionDTO.text() != null) {
            question.setText(postPatchQuestionDTO.text());
        }

        question.setLastEdited(LocalDateTime.now());

        questionRepository.save(question);
        return QuestionDTO.from(question, user);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Question> possibleQuestion = questionRepository.findByIdAndEnabledTrue(id);
        Question question = possibleQuestion.orElseThrow(NotFoundException::new);

        User questionOwner = question.getUser();
        if (!user.equals(questionOwner)) {
            throw new ForbiddenException();
        }

        question.setEnabled(false);
        for (Answer answer : answerRepository.findByQuestion(question)) {
            answer.setEnabled(false);
        }

        questionRepository.save(question);
        return ResponseEntity.notFound().build();
    }
}
