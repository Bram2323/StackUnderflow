package com.itvitae.stackunderflow.leaderboard;

import com.itvitae.stackunderflow.user.User;
import com.itvitae.stackunderflow.user.UserLeaderboardDTO;
import com.itvitae.stackunderflow.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("leaderboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "${stackunderflow.cors}")
public class LeaderboardController {
    private final LeaderboardRunner leaderboardRunner;
    private final UserRepository userRepository;
    public static final int usersPerPage = 15;

    @PatchMapping("set-leaderboard-ranking")
    public ResponseEntity<String> setLeaderboardRanking() {
        leaderboardRunner.updateLeaderboard();
        return ResponseEntity.ok("Successfully updated the leaderboard ranking of all users!");
    }

    @GetMapping("get-all-users")
    public Page<UserLeaderboardDTO> getAllUsers(@RequestParam(required = false, name = "page") Integer pageParam) {
        int page = pageParam == null ? 0 : pageParam - 1;
        Pageable pageable = PageRequest.of(page, usersPerPage, Sort.by("lastMonthRank"));

        Page<User> allUsers = userRepository.findAllByLastMonthRankNotNull(pageable);
        return allUsers.map(UserLeaderboardDTO::from);
    }
}
