package com.itvitae.stackunderflow;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.answer.AnswerRepository;
import com.itvitae.stackunderflow.question.Category;
import com.itvitae.stackunderflow.question.Question;
import com.itvitae.stackunderflow.question.QuestionRepository;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import com.itvitae.stackunderflow.user.UserService;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVote;
import com.itvitae.stackunderflow.useranswervote.UserAnswerVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserAnswerVoteRepository userAnswerVoteRepository;

    @Value("${stackunderflow.admin-password}")
    private String adminPassword;


    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            List<User> users = List.of(
                    userService.register("test", "Testww123!"),
                    userService.register("test2", "Testww123!"),
                    userService.register("test3", "Testww123!"),
                    userService.register("test4", "Testww123!")
            );

            Question question = new Question("Applicatie!", "Mijn applicatie wilt niet opstarten!", LocalDateTime.now().minusMonths(1).minusHours(2), users.get(0), Category.GENERAL);
            questionRepository.save(question);

            List<Answer> answers = List.of(
                    answerRepository.save(new Answer("HELP", LocalDateTime.now(), question, users.get(0))),
                    answerRepository.save(new Answer("That sucks", LocalDateTime.now(), question, users.get(1))),
                    answerRepository.save(new Answer("hmmmmmm", LocalDateTime.now().minusMonths(1), question, users.get(2))),
                    answerRepository.save(new Answer("good luck!", LocalDateTime.now().minusMonths(1), question, users.get(1))),
                    answerRepository.save(new Answer("I have no idea how to fix that...", LocalDateTime.now().minusMonths(1), question, users.get(3))),
                    answerRepository.save(new Answer(":/", LocalDateTime.now().minusMonths(1), question, users.get(0)))
            );

            answers.forEach(answer -> userAnswerVoteRepository.save(new UserAnswerVote(users.getFirst(), answer, true)));
            userAnswerVoteRepository.save(new UserAnswerVote(users.getLast(), answers.get(0), true));
            userAnswerVoteRepository.save(new UserAnswerVote(users.getLast(), answers.get(4), true));
        }

        Optional<User> possibleAdmin = userRepository.findByUsernameIgnoreCase("admin");
        if (possibleAdmin.isEmpty()) {
            User admin = userService.register("admin", adminPassword);
            userService.changeRole(admin, "admin");
        } else {
            User admin = possibleAdmin.get();
            if (!userService.isCorrectPassword(admin, adminPassword))
                userService.changePassword(admin, adminPassword);
        }
    }
}
