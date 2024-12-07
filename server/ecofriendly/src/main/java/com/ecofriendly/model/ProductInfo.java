package com.ecofriendly.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_info")
public class ProductInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "type_of_skin", nullable = false, unique = true, length = 25)
    private String typeOfSkin;

    @Column(name = "goal", nullable = false, unique = true, length = 25)
    private String goal;

}