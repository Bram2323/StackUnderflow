package com.itvitae.stackunderflow.user;

import java.util.UUID;

public record UserDTO(String username, String award, UUID id) {
    public static UserDTO from(User user){
        return new UserDTO(user.getUsername(), user.getAward().toString(), user.getId());
    }
}
