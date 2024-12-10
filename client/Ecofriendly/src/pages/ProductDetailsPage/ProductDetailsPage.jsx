import React, { useEffect, useState } from 'react';
import ApiConfig from "../../config/ApiConfig"; // Используем ваш настроенный API клиент
import ProductInfoComponent from '../../components/product_details/ProductInfoComponent';
import ProductTopComponent from '../../components/product_details/ProductTopComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import ProductGroup from '../../components/product_group/ProductGroup';
import ProductReviewsComponent from '../../components/product_details/ProductReviewComponent';
import { useParams } from "react-router-dom";
import PopupBuilder from '../../components/modal_windows/popup/PopupBuilder'; // Импортируем PopupBuilder

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Получаем параметр запроса из URL
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Управление состоянием попапа
  const [popupState, setPopupState] = useState({
    isOpen: false,
    type: null,
    mainText: '',
    subText: ''
  });

  const handleOperationComplete = (type, mainText, subText) => {
    setPopupState({ isOpen: true, type, mainText, subText });
  };

  const closePopup = () => {
    setPopupState({ isOpen: false, type: null, mainText: '', subText: '' });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await ApiConfig.get(`/api/public/productDetails/${productId}`); // Используем ApiConfig
        setProductData(response.data);
      } catch (err) {
        console.error("Ошибка загрузки деталей продукта:", err.message);
        setError(err.message || 'Помилка завантаження даних');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Добавляем productId в зависимости, чтобы обновление происходило при его изменении

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  const {
    title,
    shortDescription,
    price,
    image,
    countReviews,
    rating,
    volume,
    otherImage,
    description,
    characteristics,
    productGroup,
  } = productData;

  return (
    <>
      <HeaderComponent />
      <ProductTopComponent
        productName={title}
        productDescription={shortDescription}
        productPrice={price}
        discountPrice={null} // Добавьте логику для скидочной цены, если потребуется
        productImage={image}
        productReviews={countReviews}
        productRating={rating}
        productVolume={volume}
        productOtherImages={otherImage || []}
      />
      <ProductInfoComponent
        description={description}
        characteristics={characteristics || []}
      />

      <ProductReviewsComponent onOperationComplete={handleOperationComplete} />
      {productGroup && (
        <ProductGroup
          productGroup={{
            title: productGroup.title,
            productCards: productGroup.productCards || [],
          }}
        />
      )}
      <FooterComponent />

      {/* PopupBuilder для отображения попапа */}
      <PopupBuilder
        isOpen={popupState.isOpen}
        onClose={closePopup}
        type={popupState.type}
        mainText={popupState.mainText}
        subText={popupState.subText}
      />
    </>
  );
};

export default ProductDetailsPage;
