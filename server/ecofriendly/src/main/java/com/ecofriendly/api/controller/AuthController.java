package com.ecofriendly.api.controller;

import com.ecofriendly.Enum.AuthorityRole;
import com.ecofriendly.api.DTO.auth.LoginRequest;
import com.ecofriendly.api.DTO.auth.RegisterRequest;
import com.ecofriendly.security.JwtTokenProvider;
import com.ecofriendly.service.CustomerService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final CustomerService customerService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthController(CustomerService customerService, AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider) {
        this.customerService = customerService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // Устанавливаем пользователя в SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Получаем роль пользователя
        AuthorityRole role = customerService.getRoleByEmail(request.getEmail());

        Integer customerId = customerService.getCustomerId(request.getEmail());

        // Генерируем токены
        String accessToken = jwtTokenProvider.generateToken(request.getEmail(), customerId ,role, 1000L * 60 * 15 ); // 15 минут
        String refreshToken = jwtTokenProvider.generateRefreshToken(request.getEmail());

        // Устанавливаем токены в куки
        ResponseCookie accessCookie = ResponseCookie.from("accessToken", accessToken)
                .httpOnly(true)
                .secure(false) // Только HTTPS
                .path("/")
                .maxAge( 60 * 15) // 15 минут
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false) // Только HTTPS
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7 дней
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", accessCookie.toString())
                .header("Set-Cookie", refreshCookie.toString())
                .body(Map.of("customerId", customerId));
    }

    /**
     * Обновление Access Token
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        System.out.print("Test1");
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        // Извлекаем refreshToken из куки
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken, jwtTokenProvider.getREFRESH_SECRET_KEY())) {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }

        String username = jwtTokenProvider.extractUsername(refreshToken, jwtTokenProvider.getREFRESH_SECRET_KEY());
        AuthorityRole role = jwtTokenProvider.extractRole(refreshToken, jwtTokenProvider.getREFRESH_SECRET_KEY());

        // Генерация нового Access Token
        String newAccessToken = jwtTokenProvider.generateToken(username, customerService.getCustomerId(username), role, 1000L * 60 * 15); // 15 минут

        ResponseCookie accessCookie = ResponseCookie.from("accessToken", newAccessToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(15 * 60)
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", accessCookie.toString())
                .body("Token refreshed");
    }

    /**
     * Регистрация нового пользователя
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return customerService.registerCustomer(request);
    }


}
