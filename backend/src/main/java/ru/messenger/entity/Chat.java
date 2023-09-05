package ru.messenger.entity;

import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.FetchType;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
import java.util.List;
import java.util.ArrayList;
import ru.messenger.model.ChatType;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chat", schema = "public")
public class Chat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ChatType type;

    @Column(name = "name")
    private String name;

    @Column(name = "timestamp")
    private Date timestamp;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "creator_id")
    private User creator;

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinTable(
            name = "chat_member",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> members = new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, targetEntity = Message.class, orphanRemoval = true)
    @JoinColumn(name = "chat_id")
    private List<Message> messages = new ArrayList<>();

    public boolean equals(Chat user) {
        return user.id == this.id;
    }

}
