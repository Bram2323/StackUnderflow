package com.itvitae.stackunderflow.user;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    public static final String DEFAULT_ROLE = "ROLE_USER";


    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    public Optional<User> findById(UUID id){
        return userRepository.findById(id);
    }

    public User register(String username, String password){
        if (userRepository.findByUsername(username).isPresent()) throw new IllegalArgumentException("Username already exists!");
        if (!isValidUsername(username)) throw new IllegalArgumentException("Username is not valid!");
        if (!isValidPassword(password)) throw new IllegalArgumentException("Password is not valid!");
        return userRepository.save(new User(username, passwordEncoder.encode(password), DEFAULT_ROLE));
    }

    public boolean isCorrectPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    public boolean isValidUsername(String username){
        if (username == null) return false;
        if (username.length() != username.trim().length()) return false;

        return !username.isEmpty() && !username.isBlank();
    }

    public boolean isValidPassword(String password){
        return password != null && !password.isEmpty() && !password.isBlank();
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> possibleUser = userRepository.findByUsername(username);
        return possibleUser.orElseThrow(() -> new UsernameNotFoundException(username + " was not found!"));
    }
}
