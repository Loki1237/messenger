package ru.messenger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import ru.messenger.authentication.AuthFilter;

@Configuration
public class WebFilterConfig {

    @Bean
    @Primary
    public FilterRegistrationBean<AuthFilter> authenticationFilter(AuthFilter authFilter) {
        FilterRegistrationBean<AuthFilter> regBean = new FilterRegistrationBean<>();
        regBean.setFilter(authFilter);
        return regBean;
    }

}
