package ru.messenger.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.messenger.entity.Message;
import ru.messenger.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository repository;

    public Message getById(long id) {
        return repository.getById(id);
    }

    public Message create(Message message) {
        return repository.insert(message);
    }
}
