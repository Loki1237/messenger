package ru.messenger.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import ru.messenger.entity.QUser;
import ru.messenger.entity.User;
import ru.messenger.utils.JpqlQueryFactory;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private JpqlQueryFactory queryFactory;

    public User findByUsername(String username) {
        return queryFactory.createQuery()
            .selectFrom(QUser.user)
            .where(QUser.user.username.eq(username))
            .fetchOne();
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
