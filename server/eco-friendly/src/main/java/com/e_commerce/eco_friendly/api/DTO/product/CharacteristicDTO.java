package com.e_commerce.eco_friendly.api.DTO.product;

import lombok.Data;

@Data
public class CharacteristicDTO {

    private String title;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getTitle() {
        return title;
    }

    public String getValue() {
        return value;
    }

    private String value;
}
