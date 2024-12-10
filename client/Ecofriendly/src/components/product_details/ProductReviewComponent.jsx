import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ApiConfig from '../../config/ApiConfig';
import '../../scss/style.scss';

const ProductReviewsComponent = ({ onOperationComplete }) => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  // Загрузка отзывов
  const fetchReviews = async () => {
    try {
      const response = await ApiConfig.get(`/api/public/getReviews/${productId}`);
      setReviews(
        response.data.map((review) => ({
          userInitial: review.firstName[0],
          userName: review.firstName,
          rating: review.rating,
          text: review.reviewText,
          date: new Date(review.reviewDate).toLocaleDateString('uk-UA'),
        }))
      );
    } catch (err) {
      console.error('Ошибка загрузки отзывов:', err.message);
      setError('Не удалось загрузить отзывы.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Добавление отзыва
  const handleAddReview = async () => {
    try {
      // Отправка нового отзыва
      const response = await ApiConfig.post(`/api/customer/addReview/${productId}`, {
        rating,
        reviewText: newReview,
      });
  
      // Проверяем успешный статус и перезагружаем отзывы
      if (response.status === 201 || response.status === 200) {
        await fetchReviews(); // Перезагрузка отзывов
  
        // Сброс полей ввода и отображение успешного сообщения
        setNewReview('');
        setRating(0);
        setIsWritingReview(false);
  
        onOperationComplete('success', 'Успіх!', 'Ваш відгук додано.');
      }
    } catch (err) {
      console.error('Ошибка добавления отзыва:', err.response?.data?.message || err.message);
  
      // Обработка ошибок
      if (err.response?.status === 401) {
        // Пользователь не авторизован
        onOperationComplete('auth-required', 'Авторизація потрібна!', 'Увійдіть, щоб залишити відгук.');
      } else if (err.response?.status === 409) {
        // Отзыв уже существует
        onOperationComplete('error', 'Помилка!', 'Ви вже залишали відгук до цього продукту.');
      } else {
        // Другие ошибки
        onOperationComplete('error', 'Помилка!', err.response?.data?.message || 'Не вдалося додати відгук.');
      }
    }
  };
  

  return (
    <section className="product-reviews">
      <div className="product-reviews__container">
        <div className="product-reviews__title-container">
          <p className="product-reviews__title">Відгуки</p>
          <button
            className="product-reviews__button"
            onClick={() => setIsWritingReview(!isWritingReview)}
          >
            Написати відгук
          </button>
        </div>

        {isWritingReview && (
          <div className="product-reviews__write-review-container">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="product-reviews__review-input"
              placeholder="Напишіть ваш відгук"
            />
            <div className="product-reviews__stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={index}
                  src={
                    index < rating
                      ? '/img/star-icon-full.png'
                      : '/img/star-icon-empty.png'
                  }
                  alt="star"
                  onClick={() => setRating(index + 1)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <button
              className="product-reviews__write-review-button"
              onClick={handleAddReview}
            >
              Додати відгук
            </button>
          </div>
        )}

        {error && <div className="product-reviews__error">{error}</div>}

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
                {Array.from({ length: 5 }).map((_, idx) => (
                  <li key={idx} className="product-reviews__stars-item">
                    <img
                      src={
                        idx < review.rating
                          ? '/img/star-icon-full.png'
                          : '/img/star-icon-empty.png'
                      }
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

ProductReviewsComponent.propTypes = {
  onOperationComplete: PropTypes.func.isRequired,
};

export default ProductReviewsComponent;
