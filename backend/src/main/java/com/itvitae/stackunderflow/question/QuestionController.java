package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${stackunderflow.cors}")
@RestController
@RequiredArgsConstructor
@RequestMapping("vragen")
public class QuestionController {
    private final QuestionRepository questionRepository;

    @GetMapping("{id}")
    public QuestionDTO getQuestionById(@PathVariable long id) {
        var possiblyExistingQuestion = questionRepository.findById(id);
        if (possiblyExistingQuestion.isEmpty()) {
            throw new NotFoundException();
        }
        Question question = possiblyExistingQuestion.get();
        return QuestionDTO.from(question);
    }
}
