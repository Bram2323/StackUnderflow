package com.itvitae.stackunderflow.user;

import java.util.UUID;

public record UserDTO(String username, String award, Long totalPoints, Long leaderboardRanking, UUID id,
                      Boolean isAdmin) {
    public static UserDTO from(User user) {
        return new UserDTO(user.getUsername(), user.getAward().toString(), user.getLastMonthPoints(), user.getLastMonthRank(), user.getId(), user.getRole().equals(UserService.ADMIN_ROLE));
    }
}
