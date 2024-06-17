package com.itvitae.stackunderflow;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.answer.AnswerRepository;
import com.itvitae.stackunderflow.question.Question;
import com.itvitae.stackunderflow.question.QuestionRepository;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import com.itvitae.stackunderflow.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;


    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            userService.register("test", "Testww123!");
            userService.register("test1", "Testww123!");
            userService.register("test2", "Testww123!");
            userService.register("test3", "Testww123!");
        }
        if (questionRepository.count() == 0) {
            User user = userRepository.findByUsername("test").get();
            Question q1 = new Question("Applicatie!", "Mijn applicatie wilt niet opstarten!", LocalDateTime.now().minusMonths(1).minusHours(2), user);
            questionRepository.save(q1);
        }
        if (answerRepository.count() == 0) {
            List<User> users = userRepository.findAll();
            Question question = questionRepository.findAll().getFirst();
            Answer a1 = new Answer("I have no idea how to fix that...", LocalDateTime.now(), question, users.get(0));
            Answer a2 = new Answer("test", LocalDateTime.now(), question, users.get(1));
            Answer a3 = new Answer("test", LocalDateTime.now().minusMonths(1), question, users.get(2));
            Answer a4 = new Answer("test", LocalDateTime.now().minusMonths(1), question, users.get(1));
            Answer a5 = new Answer("test", LocalDateTime.now().minusMonths(1), question, users.get(3));
            Answer a6 = new Answer("test", LocalDateTime.now().minusMonths(1), question, users.get(0));
            answerRepository.save(a1);
            answerRepository.save(a2);
            answerRepository.save(a3);
            answerRepository.save(a4);
            answerRepository.save(a5);
            answerRepository.save(a6);
        }
    }
}
