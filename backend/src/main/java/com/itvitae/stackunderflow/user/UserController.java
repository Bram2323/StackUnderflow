package com.itvitae.stackunderflow.user;

import com.itvitae.stackunderflow.exceptions.BadRequestException;
import com.itvitae.stackunderflow.security.AuthDTO;
import com.itvitae.stackunderflow.security.JwtService;
import com.itvitae.stackunderflow.security.TokenDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class UserController {
    private final JwtService jwtService;
    private final UserService userService;
    private final UserRepository userRepository;


    @PostMapping("login")
    public ResponseEntity<TokenDTO> login(@RequestBody AuthDTO authDTO){
        String username = authDTO.username();
        String password = authDTO.password();
        if (username == null) throw new BadRequestException("Username is required!");
        if (password == null) throw new BadRequestException("Password is required!");

        Optional<User> possibleUser = userRepository.findByUsername(username);
        if (possibleUser.isEmpty()) throw new BadRequestException("User doesn't exist!");
        User user = possibleUser.get();

        if (!userService.isCorrectPassword(user, password)) throw new BadRequestException("Password is incorrect!");

        return ResponseEntity.ok(new TokenDTO(jwtService.generateTokenForUser(user), UserDTO.from(user)));
    }

    @PostMapping("register")
    public ResponseEntity<TokenDTO> register(@RequestBody AuthDTO authDTO){
        String username = authDTO.username();
        String password = authDTO.password();
        if (username == null) throw new BadRequestException("Username is required!");
        if (password == null) throw new BadRequestException("Password is required!");

        username = username.trim();

        if (!userService.isValidUsername(username)) throw new BadRequestException("Username is invalid!");
        if (!userService.isValidPassword(password)) throw new BadRequestException("Password is invalid!");

        if (userRepository.findByUsername(username).isPresent()) throw new BadRequestException("User already exists!");

        User user = userService.register(username, password);

        return ResponseEntity.ok(new TokenDTO(jwtService.generateTokenForUser(user), UserDTO.from(user)));
    }
}
