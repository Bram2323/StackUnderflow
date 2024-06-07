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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "${stackunderflow.cors}")
@RestController
@RequiredArgsConstructor
@RequestMapping("questions")
public class QuestionController {
    private final QuestionRepository questionRepository;

    @GetMapping()
    public List<MinimalQuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream().map(MinimalQuestionDTO::from).toList();
    }

    @GetMapping("get-by-title")
    public List<MinimalQuestionDTO> getAllQuestionsByTitle(@RequestParam(required = false) String title,
                                                           @RequestParam(name = "date-desc", required = false) boolean dateDescending,
                                                           @RequestParam(name = "date-asc", required = false) boolean dateAscending,
                                                           @RequestParam(name = "most-answers", required = false) boolean mostAnswers) {

        List<Question> possiblyExistingQuestions = new ArrayList<>();

        if (!dateAscending && !dateDescending) {
            possiblyExistingQuestions = questionRepository.findByTitleContainsIgnoreCase(title);
        } else if (mostAnswers) {
            possiblyExistingQuestions = questionRepository.findByTitleContainsIgnoreCaseOrderByAnswerCountDesc(title);
        } else if (dateAscending) {
            possiblyExistingQuestions = questionRepository.findByTitleContainsIgnoreCaseOrderByDateAsc(title);
        } else {
            possiblyExistingQuestions = questionRepository.findByTitleContainsIgnoreCaseOrderByDateDesc(title);
        }

        return possiblyExistingQuestions.stream().map(MinimalQuestionDTO::from).toList();
    }

    @GetMapping("{id}")
    public QuestionDTO getQuestionById(@PathVariable long id) {
        Optional<Question> possiblyExistingQuestion = questionRepository.findById(id);
        if (possiblyExistingQuestion.isEmpty()) {
            throw new NotFoundException();
        }
        Question question = possiblyExistingQuestion.get();
        return QuestionDTO.from(question);
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
        return ResponseEntity.created(locationOfNewQuestion).body(QuestionDTO.from(newQuestion));
    }
}
