package com.itvitae.stackunderflow.user;

import com.itvitae.stackunderflow.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class UserController {
    private final UserRepository userRepository;

    
    @GetMapping("{id}")
    private UserDTO getUser(@PathVariable UUID id) {
        Optional<User> possibleUser = userRepository.findById(id);
        User user = possibleUser.orElseThrow(NotFoundException::new);

        return UserDTO.from(user);
    }

    @GetMapping("name/{username}")
    private UserDTO getUserByName(@PathVariable String username) {
        Optional<User> possibleUser = userRepository.findByUsernameIgnoreCase(username);
        User user = possibleUser.orElseThrow(NotFoundException::new);

        return UserDTO.from(user);
    }
}
