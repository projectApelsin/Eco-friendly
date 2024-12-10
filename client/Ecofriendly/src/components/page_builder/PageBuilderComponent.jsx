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
  
    if (data.title && data.productCards) {
      return <ProductList productGroup={data} />;
    }
  
    if (Array.isArray(data) && data.every((item) => item.title && Array.isArray(item.productCards))) {
      return data.map((group, index) => (
        <ProductGroup
          key={index}
          productGroup={group}
          type={group.type} // Передаем тип группы
          categoryId={group.categoryId || null} // Передаем categoryId, если есть
        />
      ));
    }
  
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
