package com.e_commerce.eco_friendly.model.repository;

import com.e_commerce.eco_friendly.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<PurchaseOrder, Integer> {
    Optional<PurchaseOrder> findByLiqpayOrderId(String liqpayOrderId);
}