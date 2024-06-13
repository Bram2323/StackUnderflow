package com.itvitae.stackunderflow.leaderboard;

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

    @GetMapping("get-user-votes")
    public String getUserVotes() {
        leaderboardRunner.getTotalUserVotes();
        return "This is purely a debugging function for now, see the backend console for more info";
    }
}
