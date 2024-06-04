package com.itvitae.stackunderflow.question;
import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;

public record MinimalQuestionDTO(Long id, String title, LocalDateTime date, UserDTO user) {
    public static MinimalQuestionDTO from(Question question) {
        return new MinimalQuestionDTO(
                question.getId(),
                question.getTitle(),
                question.getDate(),
                UserDTO.from(question.getUser()));
    }
}
