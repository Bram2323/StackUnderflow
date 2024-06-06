package com.itvitae.stackunderflow.question;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "Questions")
@Getter
@Setter
@NoArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "Text")
    private String text;
    private LocalDateTime date;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "question")
    private List<Answer> answers = List.of();

    public Question(String title, String text, LocalDateTime date, User user) {
        this.title = title;
        this.text = text;
        this.date = date;
        this.user = user;
    }
}
