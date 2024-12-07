package com.ecofriendly.service;

import com.ecofriendly.Enum.AuthorityRole;
import com.ecofriendly.api.DTO.auth.RegisterRequest;
import com.ecofriendly.model.Customer;
import com.ecofriendly.model.repository.CustomerRepository;
import com.ecofriendly.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));



        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_" +
                customer.getAuthorityRole().name());


        return org.springframework.security.core.userdetails.User
                .withUsername(customer.getEmail())
                .password(customer.getPassword())
                .authorities(simpleGrantedAuthority) // Устанавливаем authorities
                .build();
    }

    public Integer getCustomerId(String email) {
        return customerRepository.findByEmail(email).get().getId();
    }

    public AuthorityRole getRoleByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return customer.getAuthorityRole();
    }


    private boolean isPassValid(String password) {
        return password.length() >= 8 &&
                password.matches(".*\\d.*") && // Должна быть хотя бы одна цифра
                password.matches(".*[A-Z].*"); // Должна быть хотя бы одна заглавная буква
    }

    /**
     * Регистрация нового пользователя.
     */
    public ResponseEntity<?> registerCustomer(RegisterRequest request) {
        if (!isPassValid(request.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body("Пароль должен содержать не менее 8 символов, включать цифры и заглавные буквы.");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body("Пароли не совпадают.");
        }

        // Проверка уникальности пользователя
        if (customerRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body("Пользователь с таким именем уже существует.");
        }

        Customer customer = new Customer();
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        // Устанавливаем роль "CUSTOMER"
        customer.setAuthorityRole(AuthorityRole.CUSTOMER);

        customerRepository.save(customer);

        return ResponseEntity
                .status(201)
                .body("Пользователь успешно зарегистрирован!");
    }


}


