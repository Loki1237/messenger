package ru.messenger.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.querydsl.jpa.JPAExpressions;

import java.util.List;

import ru.messenger.entity.QChat;
import ru.messenger.entity.QMessage;
import ru.messenger.entity.QUser;
import ru.messenger.entity.User;
import ru.messenger.entity.Chat;
import ru.messenger.entity.Message;
import ru.messenger.model.ChatType;
import ru.messenger.utils.JpqlQueryFactory;

@Repository
public class ChatRepositoryImpl implements ChatRepository {

    @Autowired
    private JpqlQueryFactory queryFactory;

    public Chat getById(long id) {
        return queryFactory.createQuery()
            .selectFrom(QChat.chat)
            .where(QChat.chat.id.eq(id))
            .fetchOne();
    }

    public Chat findDialog(User user1, User user2) {
        return queryFactory.createQuery()
            .selectFrom(QChat.chat)
            .where(
                QChat.chat.type.eq(ChatType.DIALOG)
                    .and(QChat.chat.members.contains(user1)
                        .and(QChat.chat.members.contains(user2)))
            )
            .innerJoin(QChat.chat.members)
            .fetchJoin()
            .fetchOne();
    }

    public List<Chat> getList(User user, int offset) {
        QChat chat = new QChat("chat");
        QMessage message = new QMessage("message");
        return queryFactory.createQuery()
            .select(QChat.chat)
            .from(QChat.chat, chat)
            .where(QChat.chat.members.contains(user))
            .offset(offset)
            .limit(30)
            .innerJoin(QChat.chat.messages, message)
            .where(message.timestamp.eq(
                JPAExpressions
                    .select(QMessage.message.timestamp.max())
                    .from(QMessage.message)
                    .where(message.chat.eq(chat))
            ))
            .fetchJoin()
            .fetch();
    }

    public long getChatCount(User user) {
        return queryFactory.createQuery()
            .from(QChat.chat)
            .where(QChat.chat.members.contains(user))
            .fetchCount();
    }

    @Transactional
    public Chat insert(Chat chat) {
        queryFactory.getEntityManager().persist(chat);
        return chat;
    }

}
