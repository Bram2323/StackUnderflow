package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserDTO;

import java.time.LocalDateTime;

public record AnswerDTO(Long id, String text, LocalDateTime date, Boolean isSolution, UserDTO user,
                        Integer votes, Boolean userHasUpVoted, Boolean userHasDownVoted) {
//    public static AnswerDTO from(Answer answer) {
//        return from(answer, null);
//    }

    public static AnswerDTO from(Answer answer, User user) {

        return new AnswerDTO(
                answer.getId(),
                answer.getText(),
                answer.getDate(),
                answer.getIsSolution(),
                UserDTO.from(answer.getUser()),
                answer.getVotes(),
                answer.hasUserUpVoted(user),
                answer.hasUserDownVoted(user)
        );
    }
}
