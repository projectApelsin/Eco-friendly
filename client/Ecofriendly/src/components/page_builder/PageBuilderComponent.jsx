import React from "react";
import Header from "../header/HeaderComponent";
import Footer from "../footer/FooterComponent";
import ProductList from "../product_list/ProductList";
import ProductGroup from "../product_group/ProductGroup";
import CategoryComponent from "../category/CategoryComponent";

const PageBuilderComponent = ({ data }) => {
  // Определяем, что рендерить в зависимости от структуры данных
  const renderContent = (data) => {
    if (!data) return <div>Данные отсутствуют</div>;

    // Одна группа продуктов
    if (data.title && data.products) {
      return <ProductList productGroup={data} />;
    }

    // Массив групп продуктов
    if (Array.isArray(data) && data.every(item => item.title && item.products)) {
      return data.map((group, index) => (
        <ProductGroup key={index} productGroup={group} />
      ));
    }

    // Если формат данных не подходит
    return <div>Неизвестный формат данных</div>;
  };

  return (
    <>
      <Header />
      <CategoryComponent/>
      {renderContent(data)}
      <Footer />
    </>
  );
};

export default PageBuilderComponent;
