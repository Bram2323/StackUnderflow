package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;

public record AnswerDTO(Long id, String text, LocalDateTime date, Boolean isSolution, UserDTO user) {
    public static AnswerDTO from(Answer answer){
        return new AnswerDTO(
                answer.getId(),
                answer.getText(),
                answer.getDate(),
                answer.getIsSolution(),
                UserDTO.from(answer.getUser())
        );
    }
}
