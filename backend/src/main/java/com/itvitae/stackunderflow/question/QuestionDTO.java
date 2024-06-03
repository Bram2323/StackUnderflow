package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;

public record QuestionDTO(Long id, String title, String text, LocalDateTime date, UserDTO user) {
    public static QuestionDTO from(Question question) {
        return new QuestionDTO(question.getId(), question.getTitle(), question.getText(), question.getDate(), UserDTO.from(question.getUser()));
    }
}
