package ru.messenger.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import ru.messenger.entity.Chat;
import ru.messenger.entity.User;
import ru.messenger.model.ChatType;
import ru.messenger.repository.ChatRepository;
import ru.messenger.model.SearchResult;

@Service
public class ChatService {

    @Autowired
    private ChatRepository repository;

    public Chat getById(long id) {
        return repository.getById(id);
    }

    public Chat findDialog(User user1, User user2) {
        return repository.findDialog(user1, user2);
    }

    public SearchResult<Chat> getList(User user, int offset) {
        List<Chat> chats = repository.getList(user, offset);
        long count = repository.getChatCount(user);

        return SearchResult.<Chat>builder().list(chats).total(count).build();
    }

    public Chat create(Chat chat) throws Exception {
        if (chat.getType().equals(ChatType.DIALOG)) {
            List<User> members = chat.getMembers();
            User member1 = members.get(0);
            User member2 = members.get(1);
            Chat dialog = findDialog(member1, member2);

            if (Objects.nonNull(dialog)) {
                throw new Exception("This dialog already exists");
            }

            String dialogName = member1.getFullName() + "::" + member2.getFullName();
            chat.setName(dialogName);
        }

        return repository.insert(chat);
    }

}
