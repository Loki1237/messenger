package ru.messenger.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import at.favre.lib.crypto.bcrypt.BCrypt;

import java.util.List;

import ru.messenger.exception.SignupException;
import ru.messenger.repository.UserRepository;
import ru.messenger.model.SearchResult;
import ru.messenger.model.ContactView;
import ru.messenger.entity.User;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User findById(long id) {
        return repository.findById(id);
    }

    public User findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public SearchResult<ContactView> findContacts(User user, int offset) {
        List<ContactView> contacts = repository.findContacts(user, offset);
        long count = repository.getContactCount(user);

        return SearchResult.<ContactView>builder().list(contacts).total(count).build();
    }

    public User create(User user) throws SignupException {
        String firstname = user.getUsername();
        String lastname = user.getPassword();
        String username = user.getUsername();
        String email = user.getUsername();
        String password = user.getPassword();

        if (firstname == null) {
            throw new SignupException("The firstname is missing");
        }

        if (lastname == null) {
            throw new SignupException("The lastname is missing");
        }

        if (username == null) {
            throw new SignupException("The username is missing");
        }

        if (email == null) {
            throw new SignupException("The email is missing");
        }

        if (password == null) {
            throw new SignupException("The password is missing");
        }

        boolean exist = repository.exists(username);

        if (exist) {
            throw new SignupException(String.format("User \"%s\" already exists", username));
        }

        user.setPassword(BCrypt.withDefaults().hashToString(12, password.toCharArray()));

        return repository.insert(user);
    }
}
