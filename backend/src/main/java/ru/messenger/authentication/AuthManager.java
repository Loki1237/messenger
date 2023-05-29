package ru.messenger.authentication;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import at.favre.lib.crypto.bcrypt.BCrypt;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Cookie;

import ru.messenger.exception.AuthException;
import ru.messenger.service.UserService;
import ru.messenger.entity.User;

@Component
public class AuthManager {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProvider jwtProvider;

    public User authenticateWithToken(HttpServletRequest request) {
        final String authToken = getTokenFromRequest(request);

        if (authToken == null) {
            throw new AuthException("Authentication token is missing");
        }

            String username = jwtProvider.parseToken(authToken).getSubject();
            User user = userService.findByUsername(username);

        if (user == null) {
            throw new AuthException("Invalid authentication token");
        }

        return user;
    }

    public User authenticateWithPassword(LoginRequest data) {
        String username = data.getUsername();
        String password = data.getPassword();

        if (username == null) {
            throw new AuthException("The username is missing");
        }

        if (password == null) {
            throw new AuthException("The password is missing");
        }

        User user = userService.findByUsername(data.getUsername());

        if (user == null) {
            throw new AuthException("Invalid username or password");
        }

        if (comparePassword(data.getPassword(), user.getPassword())) {
            return user;
        } else {
            throw new AuthException("Invalid username or password");
        }
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth")) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    private boolean comparePassword(String password, String hash) {
        return BCrypt.verifyer().verify(password.toCharArray(), hash).verified;
    }
}
