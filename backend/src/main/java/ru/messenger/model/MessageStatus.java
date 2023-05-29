package ru.messenger.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MessageStatus {
    DELIVERED("DELIVERED"),
    READ("READ"),
    ERROR("ERROR");

    private final String value;
}
