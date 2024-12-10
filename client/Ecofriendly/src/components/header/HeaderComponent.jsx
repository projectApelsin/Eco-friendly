import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/style.scss';
import SearchComponent from './SearchComponent';
import AuthModalManager from '../modal_windows/auth/AuthModalManager';
import Cart from '../modal_windows/cart/Cart';
import PopupBuilder from '../modal_windows/popup/PopupBuilder';
import ApiConfig from '../../config/ApiConfig'; // Для выполнения запросов

const HeaderComponent = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [popupProps, setPopupProps] = useState({ isOpen: false, type: '', mainText: '', subText: '' });
  const navigate = useNavigate();

  const handleOperationComplete = (type, mainText, subText) => {
    setPopupProps({ isOpen: true, type, mainText, subText });
  };

  const closePopup = () => {
    setPopupProps((prev) => ({ ...prev, isOpen: false }));
  };

  const navigateWithAuthCheck = async (path, callback) => {
    try {
      await ApiConfig.get(path); // Выполняем запрос, связанный с переходом
      if (callback) callback(); // Если запрос успешен, выполняем действие
    } catch (err) {
      if (err.response?.status === 401) {
        handleOperationComplete('auth-required', 'Авторизація потрібна!', 'Увійдіть, щоб виконати цю дію.');
      } else {
        console.error('Ошибка при проверке авторизации:', err.message);
      }
    }
  };

  const openAuthModal = () => setActiveModal('auth');
  const openCartModal = () => navigateWithAuthCheck('/api/customer/getProductsFromShoppingCart', () => setActiveModal('cart')); // Пример пути для проверки
  const navigateToWishlist = () => navigateWithAuthCheck('/api/customer/wishlistPage', () => navigate('/wishlist'));

  useEffect(() => {
    if (activeModal === 'cart') {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }

    return () => document.body.classList.remove('lock-scroll');
  }, [activeModal]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">

          <div className="header__logo">
            <Link to="/">
              <img className="header__logo-image" src="/img/logo.png" alt="Header logo" />
            </Link>
          </div>

          <SearchComponent />

          <div className="header__actions">
            <div onClick={navigateToWishlist} style={{ cursor: 'pointer' }}>
              <img
                className="header__liked"
                src="/img/Heart.png"
                alt="Liked products icon"
              />
            </div>
            <div onClick={openCartModal} style={{ cursor: 'pointer' }}>
              <img
                className="header__cart"
                src="/img/Icon.png"
                alt="Cart icon"
              />
            </div>
            <div onClick={openAuthModal} style={{ cursor: 'pointer' }}>
              <img
                className="header__profile"
                src="/img/User.png"
                alt="Profile icon"
              />
            </div>

            {activeModal === 'auth' && (
              <AuthModalManager onClose={() => setActiveModal(null)} onOperationComplete={handleOperationComplete} />
            )}
            {activeModal === 'cart' && <Cart onClose={() => setActiveModal(null)} />}

            <PopupBuilder {...popupProps} onClose={closePopup} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
