package com.itvitae.stackunderflow;

import com.itvitae.stackunderflow.question.Question;
import com.itvitae.stackunderflow.question.QuestionRepository;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import com.itvitae.stackunderflow.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;


    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("test").isEmpty()) {
            userService.register("test", "test");
        }
        if (questionRepository.count() == 0) {
            User user = userRepository.findByUsername("test").get();
            Question q1 = new Question("Testvraag", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim mauris et ornare porttitor. Nunc neque dui, ornare et tincidunt nec, scelerisque in mauris. Ut ut dictum dui. Sed malesuada ipsum tincidunt consequat lobortis. Sed a consectetur turpis. Etiam tristique magna non ipsum ultrices lacinia id at mi. Donec tempor euismod magna, sed maximus quam eleifend in. Vivamus fermentum pharetra urna, sed iaculis turpis sagittis non.", LocalDateTime.now(), user);
            questionRepository.save(q1);
        }
    }
}
