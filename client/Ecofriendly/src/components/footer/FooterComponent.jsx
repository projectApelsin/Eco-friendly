import React from 'react';
import '../../scss/style.scss';

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Логотип футера */}
        <div className="footer__logo">
          <img 
            className="footer__image" 
            src="img/footer-logo.png" 
            alt="Footer logo image" 
          />
        </div>

        {/* Контент футера */}
        <div className="footer__content">
          {/* Секция "Додатково" */}
          <div className="footer__content-item">
            <p className="footer__content-item-title">Додатково</p>
            <p className="footer__content-item-text">Публічна оферта</p>
            <p className="footer__content-item-text">
              Політика використання <br />
              файлів cookie
            </p>
          </div>

          {/* Секция "Інформація" */}
          <div className="footer__content-item">
            <p className="footer__content-item-title">Інформація</p>
            <p className="footer__content-item-text">Доставка</p>
            <p className="footer__content-item-text">Оплата</p>
            <p className="footer__content-item-text">Про продукцію</p>
          </div>

          {/* Секция "Служба підтримки" */}
          <div className="footer__content-item">
            <p className="footer__content-item-title">Служба підтримки:</p>
            <p className="footer__content-item-text">@2024Ecofriendly</p>
            <p className="footer__content-item-text">0 456 278 836</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
