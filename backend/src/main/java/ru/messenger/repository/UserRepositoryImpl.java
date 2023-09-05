package ru.messenger.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import ru.messenger.entity.QChat;
import ru.messenger.entity.QUser;
import ru.messenger.entity.User;
import ru.messenger.model.ChatType;
import ru.messenger.model.ContactView;
import ru.messenger.utils.JpqlQueryFactory;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private JpqlQueryFactory queryFactory;

    public User findById(long id) {
        return queryFactory.createQuery()
            .selectFrom(QUser.user)
            .where(QUser.user.id.eq(id))
            .fetchOne();
    }

    public User findByUsername(String username) {
        return queryFactory.createQuery()
            .selectFrom(QUser.user)
            .where(QUser.user.username.eq(username))
            .fetchOne();
    }

    public List<ContactView> findContacts(User user, int offset) {
        List<User> contacts = queryFactory.createQuery()
            .select(QUser.user)
            .from(QUser.user)
            .where(QUser.user.eq(user))
            .innerJoin(QUser.user.contacts)
            .fetchJoin()
            .fetchOne()
            .getContacts();

        return contacts.stream().map(contact -> {
            ContactView contactView = ContactView.builder().user(contact).build();

            try {
                long dialogId = queryFactory.createQuery()
                    .select(QChat.chat.id)
                    .from(QChat.chat)
                    .where(
                        QChat.chat.type.eq(ChatType.DIALOG)
                            .and(QChat.chat.members.contains(user)
                                .and(QChat.chat.members.contains(contact)))
                    )
                    .fetchOne();

                contactView.setChatId(dialogId);
            } catch (Exception e) {
                contactView.setChatId(null);
            }

            return contactView;
        }).collect(Collectors.toList());
    }

    public long getContactCount(User user) {
        return queryFactory.createQuery()
            .from(QUser.user)
            .where(QUser.user.eq(user))
            .innerJoin(QUser.user.contacts)
            .fetchCount();
    }

    public boolean exists(String username) {
        User user = this.findByUsername(username);
        return user != null;
    }

    @Transactional
    public User insert(User user) {
        queryFactory.getEntityManager().persist(user);
        return user;
    }

}
