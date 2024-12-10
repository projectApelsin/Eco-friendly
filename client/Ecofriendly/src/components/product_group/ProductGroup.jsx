import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../product_card/ProductCard";
import "../../scss/style.scss";

const ProductGroup = ({ productGroup }) => {
  const { title, productCards, groupType, id } = productGroup;
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (groupType) {
      case "SUBCATEGORY":
        navigate(`/subcategory/${id}`);
        break;
      case "RECOMMENDATION":
        navigate("/homePageCategoryDetails/recommended");
        break;
      case "DISCOUNT":
        navigate("/homePageCategoryDetails/discount");
        break;
      case "BESTSELLER":
        navigate("/homePageCategoryDetails/bestSeller");
        break;
      default:
        console.warn("Неизвестный тип группы: ", groupType);
    }
  };

  return (
    <section className="category">
      <div className="category__header">
        <div className="category__header-container">
          <p className="category__header-title">{title}</p>
          <a className="category__header-link" onClick={handleNavigate}>
            <p className="category__header-link-text">Перейти</p>
            <img src="/img/category-icon.png" alt="category link icon" />
          </a>
        </div>
        <div className="category__items">
          <div className="category__items-container">
            {productCards.map((product) => (
              <div
                className="category__items-card category__item"
                key={product.productId}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGroup;
