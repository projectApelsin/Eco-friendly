import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../scss/style.scss';

const ProductReviews = ({ reviews }) => {
  const [isWritingReview, setIsWritingReview] = useState(false);

  const handleWriteReviewClick = () => {
    setIsWritingReview(!isWritingReview);
  };

  return (
    <section className="product-reviews">
      <div className="product-reviews__container">
        <div className="product-reviews__title-container">
          <p className="product-reviews__title">Відгуки</p>
          <button 
            className="product-reviews__button"
            onClick={handleWriteReviewClick}
          >
            Написати відгук
          </button>
        </div>

        {isWritingReview && (
          <div className="product-reviews__write-review-container">
            <div className="product-reviews__review-write">
              <div className="product-reviews__top-container">
                <div className="product-reviews__review-user">
                  <div className="product-reviews__review-user-avatar">
                    <p>Н</p>
                  </div>
                  <div className="product-reviews__reviews-user-name">Надiя</div>
                </div>
                <ul className="product-reviews__stars">
                  {Array(5).fill().map((_, index) => (
                    <li key={index} className="product-reviews__stars-item">
                      <img 
                        src={index < 4 ? "img/star-icon-full.png" : "img/star-icon-empty.png"} 
                        alt="star" 
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <button className="product-reviews__write-review-button">Написати вiдгук</button>
            </div>
            <textarea 
              type="text" 
              className="product-reviews__review-input" 
              placeholder="Напiшiть ваш вiдгук"
            />
            <p className="product-reviews__date">2 липня 2024</p>
          </div>
        )}

        <div className="product-reviews__reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="product-reviews__review">
              <div className="product-reviews__review-user">
                <div className="product-reviews__review-user-avatar">
                  <p>{review.userInitial}</p>
                </div>
                <div className="product-reviews__reviews-user-name">{review.userName}</div>
              </div>
              <ul className="product-reviews__stars">
                {Array(5).fill().map((_, index) => (
                  <li key={index} className="product-reviews__stars-item">
                    <img 
                      src={index < review.rating ? "img/star-icon-full.png" : "img/star-icon-empty.png"} 
                      alt="star" 
                    />
                  </li>
                ))}
              </ul>
              <p className="product-reviews__review-text">{review.text}</p>
              <p className="product-reviews__review-date">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// PropTypes для валидации данных
ProductReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      userInitial: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductReviews;
