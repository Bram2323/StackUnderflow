package com.itvitae.stackunderflow.answer;

import com.itvitae.stackunderflow.question.Question;
import com.itvitae.stackunderflow.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

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


    public Answer(String text, LocalDateTime date, Question question, User user) {
        this.text = text;
        this.date = date;
        this.question = question;
        this.user = user;
        isSolution = false;
    }
}
