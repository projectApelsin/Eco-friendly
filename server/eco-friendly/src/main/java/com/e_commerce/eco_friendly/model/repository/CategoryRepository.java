package com.e_commerce.eco_friendly.model.repository;

import com.e_commerce.eco_friendly.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}