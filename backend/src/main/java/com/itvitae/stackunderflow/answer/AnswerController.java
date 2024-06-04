package com.itvitae.stackunderflow.answer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("answers")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class AnswerController {
    private final AnswerRepository answerRepository;



}
