package com.ecofriendly.api.DTO.product;

import lombok.Data;

@Data
public class ProductCardDTO {

    private String image;

    private String title;

    private Integer discountPrice;

    private Integer price;

    private Integer rating;
}
