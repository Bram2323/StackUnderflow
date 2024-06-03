package com.itvitae.stackunderflow.security;

import java.util.UUID;

public record TokenDTO(String token, UUID userId) {}
