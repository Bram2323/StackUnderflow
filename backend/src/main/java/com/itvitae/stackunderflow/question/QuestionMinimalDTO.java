package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;

public record QuestionMinimalDTO(Long id, String title, String text, LocalDateTime date, LocalDateTime lastEdited,
                                 UserDTO user, Integer answers) {
    public static QuestionMinimalDTO from(Question question, User user) {
        String text = question.getText();

        return new QuestionMinimalDTO(
                question.getId(),
                question.getTitle(),
                text.substring(0, Math.min(text.length(), 300)),
                question.getDate(),
                question.getLastEdited(),
                UserDTO.from(question.getUser()),
                question.getAnswerCount());
    }
}
