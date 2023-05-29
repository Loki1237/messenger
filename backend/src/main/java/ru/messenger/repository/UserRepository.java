package ru.messenger.repository;

import ru.messenger.entity.User;

public interface UserRepository {
    User findByUsername(String username);

    boolean exists(String username);

    User insert(User user);
}
