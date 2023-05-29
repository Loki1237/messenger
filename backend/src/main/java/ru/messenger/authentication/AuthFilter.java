package ru.messenger.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

import ru.messenger.entity.User;

@Component
public class AuthFilter extends GenericFilterBean {

    private final String[] URL_EXCEPTIONS = { "/user/login", "/user/signup" };

    @Autowired
    private AuthManager authManager;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain fc) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String uri = request.getRequestURI();

        if (Arrays.asList(URL_EXCEPTIONS).contains(uri)) {
            fc.doFilter(request, response);
            return;
        }

        try {
            User user = authManager.authenticateWithToken(request);

            if (user == null) {
                throw new ServletException();
            }

            request.setAttribute("user", user);
            fc.doFilter(request, response);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

}
