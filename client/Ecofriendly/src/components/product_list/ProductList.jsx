import React, { useState } from "react";
import ProductCard from "../product_card/ProductCard"; // Путь к компоненту ProductCard
import SortComponent from "../sort/SortComponent";
import "../../scss/style.scss";

const ProductList = ({ productGroup }) => {
  const { title, products } = productGroup;

  const [sortedProducts, setSortedProducts] = useState(products);

  const handleSorted = (sorted) => {
    setSortedProducts(sorted); // Обновляем состояние отсортированных продуктов
  };

  return (
    <section className="list">
      <div className="list__header">
        <div className="list__header-container">
          <p className="list__header-title">{title}</p>
          <SortComponent products={products} onSorted={handleSorted} />
        </div>
      </div>
      <div className="list__items">
        <div className="list__items-container">
          {sortedProducts.map((product) => (
            <div className="list__items-card" key={product.productId}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
