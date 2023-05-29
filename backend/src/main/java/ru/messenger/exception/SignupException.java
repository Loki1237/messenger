package ru.messenger.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupException extends RuntimeException {

    public String message;

}
