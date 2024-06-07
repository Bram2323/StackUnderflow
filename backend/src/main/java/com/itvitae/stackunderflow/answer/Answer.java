package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.question.Question;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVote;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "Answers")
@NoArgsConstructor
@Getter
@Setter
public class Answer {
    @Id
    @GeneratedValue
    private Long id;

    @Column(columnDefinition = "Text")
    private String text;

    private LocalDateTime date;

    private Boolean isSolution;

    @ManyToOne
    private Question question;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "answer")
    private List<UserAnswerVote> userAnswerVotes = List.of();


    public Answer(String text, LocalDateTime date, Question question, User user) {
        this.text = text;
        this.date = date;
        this.question = question;
        this.user = user;
        isSolution = false;
    }

    public Integer getVotes() {
        int count = 0;
        for (UserAnswerVote vote : userAnswerVotes) {
            if (vote.getIsUpvote()) count++;
            else count--;
        }
        return count;
    }

    public Boolean hasUserUpVoted(User user) {
        if (user == null) {
            return false;
        }
        for (UserAnswerVote vote : userAnswerVotes) {
            if (vote.getUser().getId().equals(user.getId())) {
                return vote.getIsUpvote();
            }
        }
        return false;
    }

    public Boolean hasUserDownVoted(User user) {
        if (user == null) {
            return false;
        }
        for (UserAnswerVote vote : userAnswerVotes) {
            if (vote.getUser().getId().equals(user.getId())) {
                return !vote.getIsUpvote();
            }
        }
        return false;
    }
}
