package com.itvitae.stackunderflow.useranswervote;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserAnswerVoteRepository extends CrudRepository<UserAnswerVote, Long> {
    Optional<UserAnswerVote> findByAnswerAndUser(Answer answer, User user);
}
