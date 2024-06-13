package com.itvitae.stackunderflow.leaderboard;

import com.itvitae.stackunderflow.answer.Answer;
import com.itvitae.stackunderflow.answer.AnswerRepository;
import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LeaderboardRunner {

    private final UserRepository userRepository;
    private final AnswerRepository answerRepository;

    public LeaderboardRunner(UserRepository userRepository, AnswerRepository answerRepository) {
        this.userRepository = userRepository;
        this.answerRepository = answerRepository;
    }

    public int getTotalUserVotes(User user) {
        int totalVotes = 0;
        // calculates for this month for testing purposes, it should be last month in the final product
        for (Answer answer : answerRepository.findByUser(user)) {
            if (answer.getDate().getMonth() == LocalDateTime.now().getMonth() &&
                    answer.getDate().getYear() == LocalDateTime.now().getYear()) {
                totalVotes += answer.getVotes();
            }
        }
        System.out.println("[DEBUG] total votes for " + user.getUsername() + " : " + totalVotes);
        return totalVotes;
    }
}
