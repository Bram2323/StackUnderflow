package com.itvitae.stackunderflow.leaderboard;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("leaderboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class LeaderboardController {
    private final LeaderboardRunner leaderboardRunner;
    private final UserRepository userRepository;

    @GetMapping("set-leaderboard-ranking")
    public String setLeaderboardRanking() {
        for (User user : userRepository.findAll()) {
            leaderboardRunner.getTotalUserVotes(user);
        }
        return "This is purely a debugging function for now, see the backend console for more info";
    }
}
