package com.e_commerce.eco_friendly.api.DTO.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductGroupDTO {

    private Integer id;

    private String title;

    private List<ProductCardDTO> productCards;

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<ProductCardDTO> getProductCards() {
        return productCards;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setProductCards(List<ProductCardDTO> productCards) {
        this.productCards = productCards;
    }
}
