package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.answer.AnswerDTO;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

public record QuestionDTO(Long id, String title, String text, LocalDateTime date, UserDTO user,
                          List<AnswerDTO> answers) {
//    public static QuestionDTO from(Question question) {
//        return from(question, null);
//    }

    public static QuestionDTO from(Question question, User user) {
        return new QuestionDTO(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getDate(),
                UserDTO.from(question.getUser()),
                question.getAnswers().stream().map(answer -> AnswerDTO.from(answer, user)).toList());
    }
}
