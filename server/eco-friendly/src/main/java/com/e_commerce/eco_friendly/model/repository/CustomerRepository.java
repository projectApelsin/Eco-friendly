package com.e_commerce.eco_friendly.model.repository;


import com.e_commerce.eco_friendly.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c WHERE LOWER(c.email) = LOWER(:email)")
    Optional<Customer> findByEmail(String email);

    List<Integer> findWishlistById(Integer customerId);
}