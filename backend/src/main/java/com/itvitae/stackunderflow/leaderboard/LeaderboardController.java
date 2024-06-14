package com.itvitae.stackunderflow.leaderboard;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        // ISSUE: if the previous users in the leaderboard has the same amount of points they don't share a rank
        // May have to implement a check to see the points of the previous user on the leaderboard and assign the same
        // rank if the points are equal.
        Integer rank = 1;
        Integer previousUserPoints = 0;
        for (User user : userRepository.findAllByOrderByTotalPointsDesc()) {
            if (user.getTotalPoints().equals(previousUserPoints)) {
                rank--;
            }
            user.setLeaderboardRanking(rank);
            userRepository.save(user);
            previousUserPoints = user.getTotalPoints();
            rank++;
        }
        return ResponseEntity.ok("Successfully updated the leaderboard ranking of all users!");
    }

    @GetMapping("get-all-users")
    public List<User> getAllUsers() {
        return userRepository.findAllByOrderByTotalPointsDesc();
    }
}
