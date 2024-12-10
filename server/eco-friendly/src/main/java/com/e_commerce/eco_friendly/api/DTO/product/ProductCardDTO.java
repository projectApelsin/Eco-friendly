package com.e_commerce.eco_friendly.api.DTO.product;

import lombok.Data;

@Data
public class ProductCardDTO {

    private Integer id;

    private String image;

    private String title;

    private Integer discountPrice;

    private Integer price;

    private Integer rating;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDiscountPrice(Integer discountPrice) {
        this.discountPrice = discountPrice;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getId() {
        return id;
    }

    public String getImage() {
        return image;
    }

    public String getTitle() {
        return title;
    }

    public Integer getDiscountPrice() {
        return discountPrice;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getRating() {
        return rating;
    }
}
