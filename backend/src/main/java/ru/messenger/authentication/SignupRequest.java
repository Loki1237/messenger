package ru.messenger.authentication;

import lombok.Value;

@Value
public class SignupRequest {
    String firstname;
    String lastname;
    String username;
    String email;
    String password;
}
