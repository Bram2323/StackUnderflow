package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.answer.AnswerDTO;
import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

public record QuestionDTO(Long id, String title, String text, LocalDateTime date, UserDTO user, List<AnswerDTO> answers) {
    public static QuestionDTO from(Question question) {
        return new QuestionDTO(
                question.getId(),
                question.getTitle(),
                question.getText(),
                question.getDate(),
                UserDTO.from(question.getUser()),
                question.getAnswers().stream().map(AnswerDTO::from).toList());
    }
}
