package com.itvitae.stackunderflow.user;

import java.util.UUID;

public record UserDTO(String username, String award, long totalPoints, long leaderboardRanking, UUID id) {
    public static UserDTO from(User user) {
        return new UserDTO(user.getUsername(), user.getAward().toString(), user.getTotalPoints(), user.getLeaderboardRanking(), user.getId());
    }
}
