import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/style.scss';
import SearchComponent from './SearchComponent';
import AuthModalManager from '../modal_windows/auth/AuthModalManager';
import Cart from '../modal_windows/cart/Cart'; // Для корзины
import PopupBuilder from '../modal_windows/popup/PopupBuilder';

const HeaderComponent = () => {
  // Состояние для управления активным модальным окном
  const [activeModal, setActiveModal] = useState(null);
  const [popupProps, setPopupProps] = useState({ isOpen: false, type: '', mainText: '', subText: '' });

  const handleOperationComplete = (type, mainText, subText) => {
    setPopupProps({ isOpen: true, type, mainText, subText });
  };

  const closePopup = () => {
    setPopupProps((prev) => ({ ...prev, isOpen: false }));
  };

  // Функции для открытия разных модальных окон
  const openAuthModal = () => setActiveModal('auth');
  const openCartModal = () => setActiveModal('cart');

  // Функция для закрытия модальных окон
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    // Блокируем прокрутку только когда открыта корзина
    if (activeModal === 'cart') {
      document.body.classList.add('lock-scroll'); // Блокируем прокрутку страницы
    } else {
      document.body.classList.remove('lock-scroll'); // Включаем прокрутку страницы
    }

    // Очистка при размонтировании
    return () => document.body.classList.remove('lock-scroll');
  }, [activeModal]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">

          <div className="header__logo">
            <Link to="#">
              <img className="header__logo-image" src="img/logo.png" alt="Header logo" />
            </Link>
          </div>

          <SearchComponent />

          <div className="header__actions">
            <Link to="#">
              <img
                className="header__liked"
                src="img/Heart.png"
                alt="Liked products icon"
              />
            </Link>
            <Link to="#">
              <img
                className="header__cart"
                src="img/Icon.png"
                alt="Cart icon"
                onClick={openCartModal} // Открытие корзины
              />
            </Link>
            <div onClick={openAuthModal} style={{ cursor: 'pointer' }}>
              <img
                className="header__profile"
                src="img/User.png"
                alt="Profile icon"
              />
            </div>

            {/* Модальные окна */}
            {activeModal === 'auth' && (
              <AuthModalManager onClose={closeModal} onOperationComplete={handleOperationComplete} />
            )}
            {activeModal === 'cart' && (
              <Cart onClose={closeModal} />
            )}

            <PopupBuilder {...popupProps} onClose={closePopup} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
