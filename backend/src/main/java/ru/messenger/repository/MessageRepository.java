package ru.messenger.repository;

import ru.messenger.entity.Message;

public interface MessageRepository {
    Message getById(long id);

    Message insert(Message message);
}
