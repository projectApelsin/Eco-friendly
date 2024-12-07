import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../scss/style.scss';

const ProductCard = ({ product }) => {
  const { image, productId, title, discountPrice, price, stars } = product;

  // Генерация звезд
  const fullStars = Array(stars).fill('img/star-icon-full.png');
  const emptyStars = Array(5 - stars).fill('img/star-icon-empty.png');
  const allStars = [...fullStars, ...emptyStars];

  // Состояние для вишлиста
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Обработчик клика по иконке вишлиста
  const handleWishlistClick = () => {
    setIsInWishlist(!isInWishlist);
    // Здесь будет запрос на сервер для добавления/удаления из вишлиста
  };

  return (
    <div className="productCard__item">
      <div className="productCard__item-image">
        <Link to={`/product/${productId}`}>
          <img src={image} alt={title} />
        </Link>
        <img
          className="productCard__item-icon"
          src={isInWishlist ? 'img/сard-like-filled.png' : 'img/card-like.png'} // Иконка вишлиста меняется в зависимости от состояния
          alt="Card like icon"
          onClick={handleWishlistClick}
        />
      </div>
      <div className="productCard__item-bottom">
        <p className="productCard__item-name">{title}</p>
        <ul className="productCard__item-stars">
          {allStars.map((star, index) => (
            <li key={index} className="productCard__item-stars-item">
              <img src={star} alt="star icon" />
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
          <Link to={`/cart`} className="productCard__item-cart">
            <img src="img/Icon.png" alt="Card cart icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    discountPrice: PropTypes.number,
    price: PropTypes.number.isRequired,
    stars: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
