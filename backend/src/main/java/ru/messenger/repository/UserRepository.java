package ru.messenger.repository;

import java.util.List;
import ru.messenger.entity.User;
import ru.messenger.model.ContactView;

public interface UserRepository {
    User findById(long id);

    User findByUsername(String username);

    List<ContactView> findContacts(User user, int offset);

    long getContactCount(User user);

    boolean exists(String username);

    User insert(User user);
}
