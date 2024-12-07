package com.ecofriendly.model;

import com.ecofriendly.Enum.ProductType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "volume", nullable = false)
    private Integer volume;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "short_description", nullable = false, length = 100)
    private String shortDescription;

    @Column(name = "main_image", nullable = false)
    private String mainImage;

    @Column(name = "card_image", nullable = false)
    private String cardImage;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(optional = false)
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @Column(name = "price", nullable = false)
    private Integer price;

    @ManyToMany
    @JoinTable(name = "product_characteristics",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "characteristics_id"))
    private Set<Characteristic> characteristics = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product", orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

}