package ru.messenger.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.messenger.entity.QMessage;
import ru.messenger.entity.Message;
import ru.messenger.utils.JpqlQueryFactory;

@Repository
public class MessageRepositoryImpl implements MessageRepository {

    @Autowired
    private JpqlQueryFactory queryFactory;

    public Message getById(long id) {
        return queryFactory.createQuery()
            .selectFrom(QMessage.message)
            .where(QMessage.message.id.eq(id))
            .fetchOne();
    }

    @Transactional
    public Message insert(Message message) {
        queryFactory.getEntityManager().persist(message);
        return message;
    }

}
