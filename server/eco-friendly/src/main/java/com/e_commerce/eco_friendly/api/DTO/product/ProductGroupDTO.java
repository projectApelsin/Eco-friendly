package com.e_commerce.eco_friendly.api.DTO.product;

import com.e_commerce.eco_friendly.Enum.GroupType;
import lombok.Data;

import java.util.List;

@Data
public class ProductGroupDTO {

    private Integer id;

    private String title;

    private List<ProductCardDTO> productCards;

    private GroupType groupType;

    public void setGroupType(GroupType groupType) {
        this.groupType = groupType;
    }

    public GroupType getGroupType() {
        return groupType;
    }

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
