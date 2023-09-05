package ru.messenger.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.Date;

import ru.messenger.entity.Message;
import ru.messenger.entity.User;
import ru.messenger.entity.Chat;
import ru.messenger.model.MessageStatus;
import ru.messenger.model.SearchResult;
import ru.messenger.service.ChatService;
import ru.messenger.service.MessageService;

@RestController
@RequestMapping(value = "/chat")
public class ChatController {

    private final ChatService chatService;
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatService chatService, MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/create")
    public ResponseEntity<Chat> createChat(HttpServletRequest request, @RequestBody Chat body) throws Exception {
        User creator = (User) request.getAttribute("user");
        Chat chat = Chat.builder()
            .type(body.getType())
            .creator(creator)
            .members(body.getMembers())
            .timestamp(new Date())
            .build();
        Chat createdChat = chatService.create(chat);

        Message message = Message.builder()
            .creator(creator)
            .body(body.getMessages().get(0).getBody())
            .timestamp(new Date())
            .status(MessageStatus.DELIVERED)
            .chat(createdChat)
            .build();
        Message createdMessage = messageService.create(message);

        createdChat.setMessages(List.of(createdMessage));

        createdChat.getMembers().forEach(member -> {
            if (member.getId() != creator.getId()) {
                messagingTemplate.convertAndSendToUser(String.valueOf(member.getId()), "/chat/create", createdChat);
            }
        });

        return ResponseEntity.ok(createdChat);
    }

    @GetMapping("/getList")
    public ResponseEntity<SearchResult<Chat>> getChatList(HttpServletRequest request, @RequestParam int offset) {
        User user = (User) request.getAttribute("user");
        SearchResult<Chat> result = chatService.getList(user, offset);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/select")
    public ResponseEntity<Chat> selectChat(HttpServletRequest request,
                                           @RequestParam Optional<Long> interlocutorId,
                                           @RequestParam Optional<Long> chatId) {
        if (interlocutorId.isPresent()) {
            User user = (User) request.getAttribute("user");
            User interlocutor = User.builder().id(interlocutorId.get()).build();
            Chat chat = chatService.findDialog(user, interlocutor);
            return ResponseEntity.ok(chat);
        } else if (chatId.isPresent()) {
            Chat chat = chatService.getById(chatId.get());
            return ResponseEntity.ok(chat);
        }

        return ResponseEntity.badRequest().build();
    }
}
