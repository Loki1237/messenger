package ru.messenger.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import ru.messenger.entity.QUser;
import ru.messenger.entity.User;
import ru.messenger.utils.JpqlQueryFactory;

import java.util.List;

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

    public List<User> findContacts(long userId, int offset) {
        User user = queryFactory.createQuery()
            .select(QUser.user)
            .from(QUser.user)
            .where(QUser.user.id.eq(userId))
            .innerJoin(QUser.user.contacts)
            .offset(offset)
            .limit(30)
            .fetchOne();

        return user.getContacts();
    }

    public long getContactCount(long userId) {
        return queryFactory.createQuery()
            .from(QUser.user)
            .where(QUser.user.id.eq(userId))
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
