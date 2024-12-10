package com.e_commerce.eco_friendly.service;

import com.e_commerce.eco_friendly.Enum.ProductType;
import com.e_commerce.eco_friendly.api.DTO.ReviewDTO;
import com.e_commerce.eco_friendly.api.DTO.page.ProductDetailsPageDTO;
import com.e_commerce.eco_friendly.api.DTO.product.ProductCardDTO;
import com.e_commerce.eco_friendly.api.DTO.product.ProductGroupDTO;
import com.e_commerce.eco_friendly.model.Product;
import com.e_commerce.eco_friendly.model.Review;
import com.e_commerce.eco_friendly.model.repository.CustomerRepository;
import com.e_commerce.eco_friendly.model.repository.ProductRepository;
import com.e_commerce.eco_friendly.model.repository.ReviewRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;

    public ProductService(ProductRepository productRepository,
                          ReviewRepository reviewRepository, CustomerRepository customerRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
    }

    public String productUnit(ProductType productType) {
        switch (productType) {
            case LIQUID -> {
                return " мл";
            }
            case PIECE -> {
                return " шт";
            }
            case SOLID -> {
                return " г";
            }

        }
        return "";
    }

    public static ProductGroupDTO toProductGroupDTO(List<Product> products, String groupTitle, Integer id) {
        // Преобразуем список продуктов в список ProductCardDTO
        List<ProductCardDTO> productCardDTOs = products.stream()
                .map(ProductService::toProductCardDTO) // Преобразование каждого Product в ProductCardDTO
                .collect(Collectors.toList());

        // Создаем ProductGroupDTO
        ProductGroupDTO productGroupDTO = new ProductGroupDTO();
        productGroupDTO.setId(id); // Устанавливаем id в null
        productGroupDTO.setTitle(groupTitle); // Устанавливаем заголовок
        productGroupDTO.setProductCards(productCardDTOs); // Устанавливаем список продуктов

        return productGroupDTO;
    }

    public static ProductCardDTO toProductCardDTO(Product product) {
        ProductCardDTO dto = new ProductCardDTO();
        dto.setId(product.getId());
        dto.setImage(product.getCardImage());
        dto.setTitle(product.getTitle());
        dto.setPrice(product.getPrice());
        dto.setDiscountPrice(calculateDiscountPrice(product.getPrice(), product.getDiscountPercent()));

        dto.setRating(product.getRating());
        return dto;
    }

    public static Integer calculateDiscountPrice(Integer price, BigDecimal discountPercent) {
        if (price == null || discountPercent == null || discountPercent.compareTo(BigDecimal.ZERO) <= 0) {
            return null;
        }

        // Рассчитываем итоговую цену с учётом скидки
        BigDecimal priceDecimal = BigDecimal.valueOf(price);
        BigDecimal discountMultiplier = BigDecimal.ONE.subtract(discountPercent.divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP));
        BigDecimal discountedPrice = priceDecimal.multiply(discountMultiplier).setScale(0, RoundingMode.HALF_UP);

        return discountedPrice.intValue(); // Приводим результат к Integer
    }


    public List<ReviewDTO> getReviewsByProduct(Integer productId) {
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        reviewRepository.findAllByProductId(productId).forEach(review -> {
            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setReviewText(review.getReviewText());
            reviewDTO.setRating(review.getRating());
            reviewDTO.setFirstName(review.getCustomer().getFirstName());
            reviewDTO.setReviewDate(review.getCreatedAt());
            reviewDTOList.add(reviewDTO);
        });
        return reviewDTOList;
    }

    public ResponseEntity<String> addReviewForProduct(Integer productId, ReviewDTO reviewDTO, Integer customerId) {
        try {
            // Проверяем, есть ли отзыв от данного пользователя для этого продукта
            boolean reviewExists = reviewRepository.existsByProductIdAndCustomerId(productId, customerId);

            if (reviewExists) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Відгук вже існує");
            }

            // Создаем новый отзыв
            Review review = new Review();
            review.setReviewText(reviewDTO.getReviewText());
            review.setRating(reviewDTO.getRating());
            review.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            review.setCustomer(customerRepository.findById(customerId)
                    .orElseThrow(() -> new RuntimeException("Користувача не знайдено")));
            review.setProduct(productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Продукт не знайдено")));
            reviewRepository.save(review);

            return ResponseEntity.status(HttpStatus.CREATED).body("Відгук створено");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Помилка: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Сталася несподівана помилка");
        }

    }
}
