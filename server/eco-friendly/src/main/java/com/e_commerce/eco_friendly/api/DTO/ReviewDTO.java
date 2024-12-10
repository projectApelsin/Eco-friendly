package com.e_commerce.eco_friendly.api.DTO;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ReviewDTO {

    private String firstName;

    private Integer rating;

    private String reviewText;

    private Timestamp reviewDate;


}
