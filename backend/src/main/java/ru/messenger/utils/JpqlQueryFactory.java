package ru.messenger.utils;

import com.querydsl.jpa.JPQLQueryFactory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Component
public class JpqlQueryFactory {

    @PersistenceContext
    private EntityManager entityManager;

    public JpqlQueryFactory() {
    }

    public JPQLQueryFactory createQuery() {
        return new JPAQueryFactory(this.entityManager);
    }

    public EntityManager getEntityManager() {
        return this.entityManager;
    }
}
