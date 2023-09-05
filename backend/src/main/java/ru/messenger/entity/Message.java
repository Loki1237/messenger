package ru.messenger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.FetchType;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

import ru.messenger.model.MessageStatus;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "message", schema = "public")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", unique = true)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "creator_id")
    private User creator;

    @Column(name = "body")
    private String body;

    @Column(name = "timestamp")
    private Date timestamp;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Chat.class)
    @JoinColumn(name = "chat_id")
    private Chat chat;

    public boolean equals(Message user) {
        return user.id == this.id;
    }

}
