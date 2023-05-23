package ru.messenger.entity;

import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
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
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name = "type")
    private ChatType type;

    @Column(name = "name")
    private String name;

    @Column(name = "creation_time")
    private String creationTime;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "creator_id")
    private User creator;

    @Builder.Default
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinTable(
            name = "chat_member",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> members = new ArrayList<>();

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Message.class, orphanRemoval = true)
    @JoinColumn(name = "chat_id")
    private List<Message> messages = new ArrayList<>();

}
