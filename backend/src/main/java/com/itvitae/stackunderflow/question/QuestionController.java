package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.exceptions.BadRequestException;
import com.itvitae.stackunderflow.exceptions.NotFoundException;
import com.itvitae.stackunderflow.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "${stackunderflow.cors}")
@RestController
@RequiredArgsConstructor
@RequestMapping("questions")
public class QuestionController {
    private final QuestionRepository questionRepository;

    @GetMapping
    public List<MinimalQuestionDTO> getAllQuestions() {
        List<Question> allQuestions = questionRepository.findAll();
        allQuestions.sort(Comparator.comparing(Question::getDate));
        Collections.reverse(allQuestions);
        return allQuestions.stream().map(MinimalQuestionDTO::from).toList();
    }

    @GetMapping("/own")
    public List<MinimalQuestionDTO> getAllQuestionsByUser(Authentication authentication) {
        User user;
        if (authentication == null) {
            user = null;
        } else {
            user = (User) authentication.getPrincipal();
        }

        if (user != null) {
            List<Question> questions = questionRepository.findByUserId(user.getId());
            questions.sort(Comparator.comparing(Question::getDate));
            Collections.reverse(questions);
            return questions.stream().map(MinimalQuestionDTO::from).toList();
        } else {
            return new ArrayList<>();
        }
    }

    @GetMapping("search")
    public List<MinimalQuestionDTO> getAllQuestionsByTitle(@RequestParam(required = false) String title,
                                                           @RequestParam(name = "sort-by", required = false) String sortBy) {

        List<Question> questions;

        if (title == null) {
            questions = questionRepository.findAll();
        } else {
            questions = questionRepository.findByTitleContainsIgnoreCase(title);
        }

        if (sortBy != null) {
            switch (sortBy) {
                case "date-asc" -> questions.sort(Comparator.comparing(Question::getDate));
                case "date-desc" -> {
                    questions.sort(Comparator.comparing(Question::getDate));
                    Collections.reverse(questions);
                }
                case "least-answers" -> questions.sort(Comparator.comparing(question -> question.getAnswers().size()));
                case "most-answers" -> {
                    questions.sort(Comparator.comparing(question -> question.getAnswers().size()));
                    Collections.reverse(questions);
                }
            }
        }

        return questions.stream().map(MinimalQuestionDTO::from).toList();
    }

    @GetMapping("{id}")
    public QuestionDTO getQuestionById(@PathVariable long id, Authentication authentication) {
        User user;
        if (authentication == null) {
            user = null;
        } else {
            user = (User) authentication.getPrincipal();
        }

        Optional<Question> possiblyExistingQuestion = questionRepository.findById(id);
        if (possiblyExistingQuestion.isEmpty()) {
            throw new NotFoundException();
        }
        Question question = possiblyExistingQuestion.get();
        return QuestionDTO.from(question, user);
    }

    @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(@RequestBody PostQuestionDTO postQuestionDTO, UriComponentsBuilder ucb, Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        if (postQuestionDTO.title() == null || postQuestionDTO.title().isBlank()) {
            throw new BadRequestException("Title can't be null");
        }
        if (postQuestionDTO.text() == null || postQuestionDTO.text().isBlank()) {
            throw new BadRequestException("Text can't be null");
        }
        Question newQuestion = new Question(postQuestionDTO.title(), postQuestionDTO.text(), LocalDateTime.now(), user);
        questionRepository.save(newQuestion);

        URI locationOfNewQuestion = ucb.path("questions/{id}").buildAndExpand(newQuestion.getId()).toUri();
        return ResponseEntity.created(locationOfNewQuestion).body(QuestionDTO.from(newQuestion, user));
    }
}
