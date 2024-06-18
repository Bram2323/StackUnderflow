package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;

public record QuestionDTO(Long id, String title, String text, LocalDateTime date, LocalDateTime lastEdited,
                          UserDTO user, Integer answers, Category category) {
    public static QuestionDTO from(Question question, User user) {
        return new QuestionDTO(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getDate(),
                question.getLastEdited(),
                UserDTO.from(question.getUser()),
                question.getAnswerCount(),
                question.getCategory());
    }
}
