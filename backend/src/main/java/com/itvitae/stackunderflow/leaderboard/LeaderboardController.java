package com.itvitae.stackunderflow.leaderboard;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("leaderboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class LeaderboardController {
    private final LeaderboardRunner leaderboardRunner;
    private final UserRepository userRepository;

    @PatchMapping("set-leaderboard-ranking")
    public ResponseEntity<String> setLeaderboardRanking() {
        for (User user : userRepository.findAll()) {
            int totalPoints = leaderboardRunner.getTotalUserVotes(user);
            user.setTotalPoints(totalPoints);
            userRepository.save(user);
        }
        return ResponseEntity.ok("Successfully updated data of all users!");
    }
}
