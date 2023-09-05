package ru.messenger.repository;

import java.util.List;
import ru.messenger.entity.Chat;
import ru.messenger.entity.User;

public interface ChatRepository {
    Chat getById(long id);

    Chat findDialog(User user1, User user2);

    List<Chat> getList(User user, int offset);

    long getChatCount(User user);

    Chat insert(Chat chat);
}
