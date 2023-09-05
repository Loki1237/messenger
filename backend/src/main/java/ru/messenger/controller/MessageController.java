package ru.messenger.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

import ru.messenger.entity.Chat;
import ru.messenger.entity.Message;
import ru.messenger.entity.User;
import ru.messenger.model.MessageStatus;
import ru.messenger.service.MessageService;
import ru.messenger.service.ChatService;

@RestController
@RequestMapping(value = "/message")
public class MessageController {

    private final ChatService chatService;
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageController(MessageService messageService, ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
        this.chatService = chatService;
    }

    @PostMapping("/send")
    public ResponseEntity<Message> createMessage(HttpServletRequest request,
                                                 @RequestParam long chatId,
                                                 @RequestBody Message body) {
        User creator = (User) request.getAttribute("user");
        Chat chat = chatService.getById(chatId);
        Message message = Message.builder()
            .creator(creator)
            .body(body.getBody())
            .timestamp(new Date())
            .status(MessageStatus.DELIVERED)
            .chat(chat)
            .build();

        Message createdMessage = messageService.create(message);

        chat.getMembers().forEach(member -> {
            if (member.equals(creator)) {
                messagingTemplate.convertAndSendToUser(String.valueOf(member.getId()), "/message/send", createdMessage);
            }
        });

        return ResponseEntity.ok(createdMessage);
    }
}
