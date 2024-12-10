package com.e_commerce.eco_friendly.model;

import com.e_commerce.eco_friendly.Enum.form.GoalType;
import com.e_commerce.eco_friendly.Enum.form.SkinType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "product_info")
public class ProductInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private SkinType typeOfSkin;

    @Enumerated(EnumType.STRING)
    private GoalType goal;

    @OneToMany(mappedBy = "productInfo", orphanRemoval = true)
    private List<Product> products = new ArrayList<>();

}