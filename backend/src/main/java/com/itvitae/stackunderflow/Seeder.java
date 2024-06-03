package com.itvitae.stackunderflow;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import com.itvitae.stackunderflow.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;


    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("test").isEmpty()){
            userService.register("test", "test");
        }
    }
}
