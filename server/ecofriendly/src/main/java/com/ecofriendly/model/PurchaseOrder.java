package com.ecofriendly.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@Entity
@Table(name = "purchase_order")
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "purchased_products", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "purchase_order_id")
    private Collection<Integer> purchasedProducts = new ArrayList<>();

    @Column(name = "updated_at")
    private Timestamp updatedAt;

}