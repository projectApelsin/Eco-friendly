package com.e_commerce.eco_friendly.api.DTO.page;


import com.e_commerce.eco_friendly.api.DTO.product.CharacteristicDTO;
import com.e_commerce.eco_friendly.api.DTO.product.ProductGroupDTO;
import lombok.Data;

import java.util.List;


@Data
public class ProductDetailsPageDTO {

    private String title;

    private String shortDescription;

    private Integer price;

    private String image;

    private Integer countReviews;

    private Integer rating;

    private String volume;

    private List<String> otherImage;

    private String description;

    private List<CharacteristicDTO> characteristics;

    private ProductGroupDTO productGroup;


    public void setTitle(String title) {
        this.title = title;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setCountReviews(Integer countReviews) {
        this.countReviews = countReviews;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public void setOtherImage(List<String> otherImage) {
        this.otherImage = otherImage;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCharacteristics(List<CharacteristicDTO> characteristics) {
        this.characteristics = characteristics;
    }

    public void setProductGroup(ProductGroupDTO productGroup) {
        this.productGroup = productGroup;
    }

    public String getTitle() {
        return title;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public Integer getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }

    public Integer getCountReviews() {
        return countReviews;
    }

    public Integer getRating() {
        return rating;
    }

    public String getVolume() {
        return volume;
    }

    public List<String> getOtherImage() {
        return otherImage;
    }

    public String getDescription() {
        return description;
    }

    public List<CharacteristicDTO> getCharacteristics() {
        return characteristics;
    }

    public ProductGroupDTO getProductGroup() {
        return productGroup;
    }
}
