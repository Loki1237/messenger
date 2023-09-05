package ru.messenger.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import ru.messenger.exception.AuthException;
import ru.messenger.exception.SignupException;
import ru.messenger.authentication.JwtProvider;
import ru.messenger.authentication.AuthManager;
import ru.messenger.authentication.LoginRequest;
import ru.messenger.authentication.SignupRequest;
import ru.messenger.model.SearchResult;
import ru.messenger.model.ContactView;
import ru.messenger.service.UserService;
import ru.messenger.entity.User;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final AuthManager authManager;

    public UserController(UserService userService, JwtProvider jwtProvider, AuthManager authManager) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.authManager = authManager;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(HttpServletRequest request,
                                      HttpServletResponse response,
                                      @RequestBody(required = false) LoginRequest body) throws InterruptedException {
        Thread.sleep(1000); // TODO: remove
        User user;

        if (body != null) {
            user = authManager.authenticateWithPassword(body);
        } else {
            user = authManager.authenticateWithToken(request);
        }

        Cookie cookie = createCookieWithToken(user.getUsername());
        response.addCookie(cookie);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(HttpServletResponse response, @RequestBody SignupRequest body) {
        User user = User.builder()
            .firstname(body.getFirstname())
            .lastname(body.getLastname())
            .username(body.getUsername())
            .password(body.getPassword())
            .email(body.getEmail())
            .build();
        User createdUser = userService.create(user);
        Cookie cookie = createCookieWithToken(createdUser.getUsername());
        response.addCookie(cookie);

        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/contacts")
    public ResponseEntity<SearchResult<ContactView>> getContacts(HttpServletRequest request, @RequestParam(value = "offset") int offset) {
        try {
            User user = (User) request.getAttribute("user");
            SearchResult<ContactView> result = userService.findContacts(user, offset);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
    }

    private Cookie createCookieWithToken(String username) {
        String authToken = jwtProvider.createToken(username);
        Cookie cookie = new Cookie("auth", authToken);
        cookie.setMaxAge(30 * 24 * 60 * 60); // 30 days

        return cookie;
    }

    @ExceptionHandler(AuthException.class)
    private ResponseEntity<String> handleAuthException(AuthException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler(SignupException.class)
    private ResponseEntity<String> handleSignupException(SignupException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

}
