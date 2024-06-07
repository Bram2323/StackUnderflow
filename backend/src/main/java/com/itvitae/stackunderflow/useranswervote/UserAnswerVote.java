package com.itvitae.stackunderflow.useranswervote;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "UserAnswerVotes")
@NoArgsConstructor
@Getter
@Setter
public class UserAnswerVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Answer answer;
    private Boolean isUpvote;

    public UserAnswerVote(User user, Answer answer, Boolean isUpvote) {
        this.user = user;
        this.answer = answer;
        this.isUpvote = isUpvote;
    }
}
