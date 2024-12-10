import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ApiConfig from '../../config/ApiConfig'; // Ваш настроенный API клиент
import PopupBuilder from '../modal_windows/popup/PopupBuilder'; // Компонент попапа
import '../../scss/style.scss';

const ProductCard = ({ product }) => {
  const { image, id, title, discountPrice, price, rating } = product;

  // Генерация звезд
  const fullStars = Array(rating).fill('img/star-icon-full.png');
  const emptyStars = Array(5 - rating).fill('img/star-icon-empty.png');
  const allStars = [...fullStars, ...emptyStars];

  // Состояния
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [popupProps, setPopupProps] = useState({ isOpen: false, type: '', mainText: '', subText: '' });

  // Проверка статуса вишлиста при монтировании компонента
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const response = await ApiConfig.get(`/api/customer/isInWishlist/${id}`);
        setIsInWishlist(response.data); // Предполагается, что сервер возвращает `true` или `false`
      } catch (err) {
        console.error('Ошибка проверки статуса вишлиста:', err.message);
      }
    };

    checkWishlistStatus();
  }, [id]);

  // Обработчик клика по иконке вишлиста
  const handleWishlistClick = async () => {
    try {
      if (isInWishlist) {
        await ApiConfig.delete(`/api/customer/deleteFromWishlist/${id}`);
        setIsInWishlist(false);
      } else {
        await ApiConfig.post(`/api/customer/addToWishlist/${id}`);
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error('Ошибка изменения статуса вишлиста:', err.message);

      if (err.response?.status === 401) {
        setPopupProps({
          isOpen: true,
          type: 'auth-required',
          mainText: 'Авторизація потрібна!',
          subText: 'Увійдіть у свій акаунт, щоб додати товар у вишлист.',
        });
      }
    }
  };

  // Обработчик клика по кнопке корзины
  const handleAddToCartClick = async () => {
    try {
      await ApiConfig.post(`/api/customer/addToShoppingCart/${id}`);

      setPopupProps({
        isOpen: true,
        type: 'success',
        mainText: 'Успіх!',
        subText: 'Товар успішно додано до кошика.',
      });
    } catch (err) {
      console.error('Ошибка добавления товара в корзину:', err.response);

      // Обработка ошибок на основе статуса и тела ответа
      const statusCode = err.response?.status;
      const responseBody = err.response?.data?.body || 'Щось пішло не так.';

      if (statusCode === 401) {
        setPopupProps({
          isOpen: true,
          type: 'auth-required',
          mainText: 'Авторизація потрібна!',
          subText: 'Увійдіть у свій акаунт, щоб додати товар у кошик.',
        });
      } else if (statusCode === 409) {
        setPopupProps({
          isOpen: true,
          type: 'error',
          mainText: 'Товар у кошику!',
          subText: responseBody,
        });
      } else {
        setPopupProps({
          isOpen: true,
          type: 'error',
          mainText: 'Помилка!',
          subText: responseBody,
        });
      }
    }
  };

  const closePopup = () => {
    setPopupProps((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="productCard__item">
      <div className="productCard__item-image">
        <Link to={`/productDetails/${id}`}>
          <img src={"/img/" + image} alt={title} />
        </Link>
        <img
          className="productCard__item-icon"
          src={isInWishlist ? '/img/сard-like-filled.png' : '/img/card-like.png'}
          alt="Card like icon"
          onClick={handleWishlistClick}
        />
      </div>
      <div className="productCard__item-bottom">
        <p className="productCard__item-name">{title}</p>
        <ul className="productCard__item-stars">
          {allStars.map((star, index) => (
            <li key={index} className="productCard__item-stars-item">
              <img src={"/" + star} alt="star icon" />
            </li>
          ))}
        </ul>
        <div className="productCard__item-actions">
          <div className="productCard__item-actions-prices">
            <p className="productCard__item-actions-value">
              {discountPrice ? `${discountPrice} ₴` : `${price} ₴`}
            </p>
            {discountPrice && <p className="productCard__item-actions-old">{price} ₴</p>}
          </div>
          <div className="productCard__item-cart" onClick={handleAddToCartClick}>
            <img src="/img/Icon.png" alt="Card cart icon" />
          </div>
        </div>
      </div>

      {/* Попап авторизации или уведомления */}
      <PopupBuilder {...popupProps} onClose={closePopup} />
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    discountPrice: PropTypes.number,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
