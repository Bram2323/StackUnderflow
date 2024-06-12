package com.itvitae.stackunderflow.question;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class QuestionWithAnswerCount {
    private Question question;
    private Long answerCount;
}
