package com.e_commerce.eco_friendly.service;

import com.e_commerce.eco_friendly.Enum.GroupType;
import com.e_commerce.eco_friendly.api.DTO.CategoryDTO;
import com.e_commerce.eco_friendly.api.DTO.page.ProductDetailsPageDTO;
import com.e_commerce.eco_friendly.api.DTO.product.CharacteristicDTO;
import com.e_commerce.eco_friendly.api.DTO.product.ProductCardDTO;
import com.e_commerce.eco_friendly.api.DTO.product.ProductGroupDTO;
import com.e_commerce.eco_friendly.model.*;
import com.e_commerce.eco_friendly.model.repository.CategoryRepository;
import com.e_commerce.eco_friendly.model.repository.SubcategoryRepository;
import com.e_commerce.eco_friendly.model.repository.CustomerRepository;
import com.e_commerce.eco_friendly.model.repository.ProductRepository;
import com.e_commerce.eco_friendly.model.repository.ReviewRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Service
public class PageService {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final ProductService productService;
    private final CustomerRepository customerRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final CategoryRepository categoryRepository;


    public PageService(ProductRepository productRepository, ReviewRepository reviewRepository, ProductService productService, CustomerRepository customerRepository,
                       SubcategoryRepository subcategoryRepository,
                       CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.customerRepository = customerRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductDetailsPageDTO getProductDetails(Integer productId) {
        Product product = productRepository.findById(productId).get();
        ProductDetailsPageDTO productDetailsPageDTO = new ProductDetailsPageDTO();

        productDetailsPageDTO.setTitle(product.getTitle());
        productDetailsPageDTO.setDescription(product.getDescription());
        productDetailsPageDTO.setPrice(product.getPrice());
        productDetailsPageDTO.setShortDescription(product.getShortDescription());
        productDetailsPageDTO.setRating(product.getAverageRating());
        productDetailsPageDTO.setImage(product.getMainImage());
        productDetailsPageDTO.setOtherImage(product.getOtherPictureUrl());
        List<CharacteristicDTO> characteristicDTOList = new ArrayList<>();
        product.getCharacteristics().forEach(characteristic -> {
            CharacteristicDTO characteristicDTO = new CharacteristicDTO();
            characteristicDTO.setValue(characteristic.getValue());
            characteristicDTO.setTitle(characteristic.getTitle());
            characteristicDTOList.add(characteristicDTO);
        });
        productDetailsPageDTO.setCharacteristics(characteristicDTOList);

        productDetailsPageDTO.setVolume(product.getVolume() + productService.productUnit(product.getProductType()));

        productDetailsPageDTO.setCountReviews(reviewRepository.findCountReviewsByProductId(productId));

        productDetailsPageDTO.setProductGroup(ProductService.toProductGroupDTO(productRepository
                .findSimilarProductsById(productId, PageRequest.of(0, 4)),
                "Схожі ігри", null));

        return productDetailsPageDTO;
    }

    // TODO реализовать
    public List<ProductGroupDTO> getHomePage(Integer customerId) {
        List<ProductGroupDTO> productGroupDTOList = new ArrayList<>();

        productGroupDTOList.add(ProductService.toProductGroupDTO(
                productRepository.findPopularProducts(),
                "Бестселлери", null, GroupType.BESTSELLER
        ));

        productGroupDTOList.add(ProductService.toProductGroupDTO(
                productRepository.findDiscountedProducts(),
                "Акції", null, GroupType.DISCOUNT
        ));

        productGroupDTOList.add(ProductService.toProductGroupDTO(
                productRepository.findRecommendedProducts(customerId),
                "Рекомендовані товари", null, GroupType.RECOMMENDATION
        ));

        return productGroupDTOList;
    }


    public ProductGroupDTO getHomePageCategoryDetails(String criteria,  Integer customerId){
        switch (criteria){
            case "recommended": return ProductService.toProductGroupDTO(productRepository
                    .findRecommendedProducts(customerId),"Рекомендовані товари", null);
            case "discount":return ProductService.toProductGroupDTO(productRepository
                    .findDiscountedProducts(),"Акції", null);
            case "bestSeller": return ProductService.toProductGroupDTO(productRepository.findPopularProducts(),
                    "Бестселлери", null);

        }
        return null;
    }


    // TODO реализовать
    public List<ProductGroupDTO> getCategoryPage(Integer categoryId) {
        Set<Subcategory> subcategories = categoryRepository.findById(categoryId).get().getSubcategories();

        List<ProductGroupDTO> productGroupDTOList = new ArrayList<>();
        subcategories.forEach(subcategory -> {
            List<Product> filteredProducts = productRepository.findProductsBySubcategoryAndCategory(subcategory.getId(), categoryId);

            productGroupDTOList.add(ProductService.toProductGroupDTO(
                    filteredProducts, subcategory.getTitle(), subcategory.getId(), GroupType.SUBCATEGORY
            ));
        });
        return productGroupDTOList;
    }
    // TODO реализовать
    public ProductGroupDTO getSubcategoryPage(Integer subcategoryId) {
        Subcategory subcategory = subcategoryRepository.findById(subcategoryId).get();
        return ProductService.toProductGroupDTO(
                subcategory.getProducts(), subcategory.getTitle(), subcategoryId, GroupType.SUBCATEGORY
        );
    }

    // TODO реализовать
    public ProductGroupDTO getWishlistPage(Integer customerId) {
        Customer customer = customerRepository.findById(customerId).get();
        Collection<Integer> productIdList = customer.getWishlist();
        List<Product> productList = new ArrayList<>();
        productIdList.forEach(productId-> {
            productList.add(productRepository.findById(productId).get());
        });
        return ProductService.toProductGroupDTO(productList, "Список ваших бажань", customerId);
    }

    // TODO реализовать
    public ProductGroupDTO getSearchResultPage(String query) {
        return ProductService.toProductGroupDTO(productRepository.findAllByTitleLike(query),
                "Результати Вашого пошуку", null);
    }

    // TODO реализовать
    public List<ProductCardDTO> getFastSearchResult(String query) {
        List<ProductCardDTO> productCardDTOList = new ArrayList<>();
        productRepository.findAllByTitleLike(query).forEach(product->{
            productCardDTOList.add(ProductService.toProductCardDTO(product));
        });
        return productCardDTOList;
    }

    public List<CategoryDTO> getCategoryTitles() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOList = new ArrayList<>();
        categories.forEach(category -> {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(category.getId());
            categoryDTO.setTitle(category.getTitle());
            categoryDTOList.add(categoryDTO);
        });
        return categoryDTOList;
    }
}
