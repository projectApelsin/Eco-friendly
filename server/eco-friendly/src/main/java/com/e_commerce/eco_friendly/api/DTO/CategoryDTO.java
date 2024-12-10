package com.e_commerce.eco_friendly.api.DTO;

import lombok.Data;

@Data
public class CategoryDTO {

    private Integer id;

    private String title;


    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public Integer getId() {
        return id;
    }
}
