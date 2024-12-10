package com.e_commerce.eco_friendly.api.controller;

import com.e_commerce.eco_friendly.api.DTO.CategoryDTO;
import com.e_commerce.eco_friendly.api.DTO.page.ProductDetailsPageDTO;
import com.e_commerce.eco_friendly.api.DTO.product.ProductCardDTO;
import com.e_commerce.eco_friendly.api.DTO.product.ProductGroupDTO;
import com.e_commerce.eco_friendly.security.JwtTokenProvider;
import com.e_commerce.eco_friendly.service.CustomerService;
import com.e_commerce.eco_friendly.service.PageService;
import com.e_commerce.eco_friendly.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PageController {


    @Autowired
    private CustomerService customerService;
    @Autowired
    private PageService pageService;

    @GetMapping("/public/productDetails/{id}")
    private ResponseEntity<ProductDetailsPageDTO> getProductDetails(@PathVariable Integer id) {
        return ResponseEntity.ok().body(pageService.getProductDetails(id));
    }
    // TODO реализовать
    @GetMapping("/public/homePage")
    private ResponseEntity<List<ProductGroupDTO>> getHomePage(HttpServletRequest request){
        return ResponseEntity.ok().body(pageService.getHomePage(customerService.getCustomerIdFromRequest(request)));
    }
    // TODO реализовать
    @GetMapping("/public/categoryPage/{categoryId}")
    private ResponseEntity<List<ProductGroupDTO>> getCategoryPage(@PathVariable Integer categoryId){
        return ResponseEntity.ok().body(pageService.getCategoryPage(categoryId));
    }
    // TODO реализовать
    @GetMapping("/public/subcategoryPage/{subcategoryId}")
    private ResponseEntity<ProductGroupDTO> getSubcategoryPage(@PathVariable Integer subcategoryId){
        return ResponseEntity.ok().body(pageService.getSubcategoryPage(subcategoryId));
    }
    // TODO реализовать
    @GetMapping("/customer/wishlistPage")
    private ResponseEntity<ProductGroupDTO> getWishlistPage(HttpServletRequest request){
        return ResponseEntity.ok().body(pageService.getWishlistPage(customerService.getCustomerIdFromRequest(request)));
    }
    // TODO реализовать
    @GetMapping("/public/fastSearch/{query}")
    private ResponseEntity<List<ProductCardDTO>> getFastSearchResult(@PathVariable String query){
        return ResponseEntity.ok().body(pageService.getFastSearchResult(query));
    }

    @GetMapping("/public/searchResult/{query}")
    private ResponseEntity<ProductGroupDTO> getSearchResultPage(@PathVariable String query){
        return ResponseEntity.ok().body(pageService.getSearchResultPage(query));
    }

    @GetMapping("/public/categoryTitles")
    private ResponseEntity<List<CategoryDTO>> getCategoryTitles(){
        return ResponseEntity.ok().body(pageService.getCategoryTitles());
    }

    @GetMapping("/public/homePageCategoryDetails/{criteria}")
    private ResponseEntity<ProductGroupDTO> getHomePageCategoryDetails(@PathVariable String criteria,
                                                                       HttpServletRequest request){
        return  ResponseEntity.ok().body(pageService.getHomePageCategoryDetails(criteria,
                customerService.getCustomerIdFromRequest(request)));
    }



}
