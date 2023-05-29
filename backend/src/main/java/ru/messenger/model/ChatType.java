package ru.messenger.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ChatType {
    CHANNEL("CHANNEL"),
    DIALOG("DIALOG"),
    GROUP("GROUP"),
    SELF("SELF");

    private final String value;
}
