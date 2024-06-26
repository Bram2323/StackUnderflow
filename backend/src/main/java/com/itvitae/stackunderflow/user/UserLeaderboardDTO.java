package com.itvitae.stackunderflow.user;

import java.util.UUID;

public record UserLeaderboardDTO(String username, String award, UUID id, long totalPoints,
                                 long leaderboardRanking) {
    public static UserLeaderboardDTO from(User user) {
        return new UserLeaderboardDTO(user.getUsername(), user.getAward().toString(), user.getId(), user.getLastMonthPoints(), user.getLastMonthRank());
    }
}
