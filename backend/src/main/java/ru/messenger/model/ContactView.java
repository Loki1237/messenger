package ru.messenger.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import ru.messenger.entity.User;

@Getter
@Setter
@Builder
public class ContactView {
    private User user;
    private Long chatId;
}
