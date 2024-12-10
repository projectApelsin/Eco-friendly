package com.e_commerce.eco_friendly.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "characteristic")
public class Characteristic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, unique = true, length = 25)
    private String title;

    @Column(name = "value", nullable = false, unique = true, length = 25)
    private String value;

    @ManyToMany(mappedBy = "characteristics")
    private Set<Product> products = new LinkedHashSet<>();

}