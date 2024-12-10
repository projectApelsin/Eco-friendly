package com.e_commerce.eco_friendly.api.DTO;

import com.e_commerce.eco_friendly.Enum.form.GoalType;
import com.e_commerce.eco_friendly.Enum.form.SkinType;
import lombok.Data;

@Data
public class ProductInfoDTO {
    private SkinType skin;

    private GoalType goal;

}
