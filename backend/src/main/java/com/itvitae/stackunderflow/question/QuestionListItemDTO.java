package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;

public record QuestionListItemDTO(Long id, String title, String text, LocalDateTime date, LocalDateTime lastEdited,
                                  UserDTO user,
                                  Integer answers) {
    public static QuestionListItemDTO from(Question question) {
        return new QuestionListItemDTO(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getDate(),
                question.getLastEdited(),
                UserDTO.from(question.getUser()),
                question.getAnswerCount());
    }
}
