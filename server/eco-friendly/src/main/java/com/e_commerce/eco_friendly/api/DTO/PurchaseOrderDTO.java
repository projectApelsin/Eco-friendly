package com.e_commerce.eco_friendly.api.DTO;


import lombok.Data;

import java.util.Collection;

@Data
public class PurchaseOrderDTO {

    private Integer customerId;

    private Collection<Integer> purchaseProductsId;

    private Integer price;

    private String city;

    private String deliveryMethod;

    private String postalOffice;




}