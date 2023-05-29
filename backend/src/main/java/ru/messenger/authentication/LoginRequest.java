package ru.messenger.authentication;

import lombok.Value;

@Value
public class LoginRequest {
    String username;
    String password;
}
