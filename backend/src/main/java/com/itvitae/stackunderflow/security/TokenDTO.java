package com.itvitae.stackunderflow.security;

import com.itvitae.stackunderflow.user.UserDTO;

public record TokenDTO(String token, UserDTO user) {}
