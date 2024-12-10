package com.e_commerce.eco_friendly.api.DTO.product;

import lombok.Data;

@Data
public class ProductShoppingCartDTO {

    private Integer id;

    private String image;

    private String title;

    private String capacity;

    private Integer price;

    private Integer amount;

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getCapacity() {
        return capacity;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getAmount() {
        return amount;
    }
}
