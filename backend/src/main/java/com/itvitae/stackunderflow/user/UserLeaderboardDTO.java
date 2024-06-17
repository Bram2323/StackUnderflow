package com.itvitae.stackunderflow.user;

import java.util.UUID;

public record UserLeaderboardDTO(String username, Award award, UUID id, long totalPoints,
                                 long leaderboardRanking) {
    public static UserLeaderboardDTO from(User user) {
        return new UserLeaderboardDTO(user.getUsername(), user.getAward(), user.getId(), user.getTotalPoints(), user.getLeaderboardRanking());
    }
}
