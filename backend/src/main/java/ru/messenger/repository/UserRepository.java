package ru.messenger.repository;

import java.util.List;
import ru.messenger.entity.User;

public interface UserRepository {
    User findById(long id);

    User findByUsername(String username);

    List<User> findContacts(long userId, int offset);

    long getContactCount(long userId);

    boolean exists(String username);

    User insert(User user);
}
