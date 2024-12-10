package com.e_commerce.eco_friendly.model.repository;

import com.e_commerce.eco_friendly.Enum.form.GoalType;
import com.e_commerce.eco_friendly.Enum.form.SkinType;
import com.e_commerce.eco_friendly.model.ProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductInfoRepository extends JpaRepository<ProductInfo, Integer> {
    @Query("SELECT p.id FROM ProductInfo p WHERE p.typeOfSkin = :typeOfSkin AND p.goal = :goal")
    Integer findIdBySkinTypeAndGoal(@Param("typeOfSkin") SkinType typeOfSkin, @Param("goal") GoalType goal);

}