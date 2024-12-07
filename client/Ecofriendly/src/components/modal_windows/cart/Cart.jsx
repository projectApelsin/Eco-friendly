import React from 'react';
import '../../../scss/style.scss';
import Modal from '../Modal';



  
  

const CartItem = ({ image, title, capacity, price, amount, onRemove }) => (
  <div className="cart__item">
    <div className="cart__item-image">
      <img src={image} alt={title} />
    </div>
    <div className="cart__item-details">
      <p className="cart__item-title">{title}</p>
      <p className="cart__item-capacity">Об’єм: {capacity}</p>
      <div className="cart__info-amount">
        <svg
          className="cart__info-amount-icon cart__info-amount-icon--disabled"
          width="3.3vh"
          height="3.2vh"
          viewBox="0 0 33 32"
          fill="none"
          stroke="#0E0F0E"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5 16H12.5M28.5 16C28.5 22.6274 23.1274 28 16.5 28C9.87258 28 4.5 22.6274 4.5 16C4.5 9.37258 9.87258 4 16.5 4C23.1274 4 28.5 9.37258 28.5 16Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="cart__info-amount-value">{amount}</span>
        <svg
          className="cart__info-amount-icon"
          width="3.3vh"
          height="3.2vh"
          viewBox="0 0 33 32"
          fill="none"
          stroke="#0E0F0E"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 12V16M16.5 16V20M16.5 16H20.5M16.5 16H12.5M28.5 16C28.5 22.6274 23.1274 28 16.5 28C9.87258 28 4.5 22.6274 4.5 16C4.5 9.37258 9.87258 4 16.5 4C23.1274 4 28.5 9.37258 28.5 16Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
    <div className="cart__item-price">{price} ₴</div>
    <svg
      className="cart__item-remove"
      width="2.6vh"
      height="2.6vh"
      viewBox="0 0 26 26"
      fill="#0E0F0E"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onRemove(title)}
    >
      <path
        d="M7.5835 22.75C6.98766 22.75 6.47777 22.538 6.05383 22.1141C5.62988 21.6901 5.41755 21.1799 5.41683 20.5833V6.5H4.3335V4.33333H9.75016V3.25H16.2502V4.33333H21.6668V6.5H20.5835V20.5833C20.5835 21.1792 20.3715 21.6894 19.9476 22.1141C19.5236 22.5388 19.0134 22.7507 18.4168 22.75H7.5835ZM18.4168 6.5H7.5835V20.5833H18.4168V6.5ZM9.75016 18.4167H11.9168V8.66667H9.75016V18.4167ZM14.0835 18.4167H16.2502V8.66667H14.0835V18.4167Z"
      />
    </svg>
  </div>
);

const Cart = ({ items, totalAmount, onRemoveItem, onOrder }) => (
  <section className="cart">
    <div className="cart__top">
      <p className="cart__top-title">Корзина</p>
      <a href="#" className="cart__top-close"></a>
    </div>
    <div className="cart__content">
      <div className="cart__items">
        {items.map(item => (
          <CartItem
            key={item.title}
            image={item.image}
            title={item.title}
            capacity={item.capacity}
            price={item.price}
            amount={item.amount}
            onRemove={onRemoveItem}
          />
        ))}
       
      </div>
      
      <div className="cart__summary">
        <div className="cart__summary-total">
          <p className="cart__summary-text">Загальна сума:</p>
          <p className="cart__summary-amount">{totalAmount} ₴</p>
        </div>
        <button className="cart__summary-order" onClick={onOrder}>Оформити замовлення</button>
        <a href="#" className="cart__summary-continue">Продовжити покупки</a>
      </div>
    </div>
  </section>
);



const App = ({onClose}) => {
  const items = [
    {
      image: "/img/product-image-preview-1.png",
      title: "Тонік для обличчя \"Трояндова роса\"",
      capacity: "100 мл",
      price: 200,
      amount: 1
    },
    {
        image: "/img/product-image-preview-1.png",
        title: "Тонік для обличчя \"Трояндова роса\"",
        capacity: "100 мл",
        price: 200,
        amount: 1
      },
      {
        image: "/img/product-image-preview-1.png",
        title: "Тонік для обличчя \"Трояндова роса\"",
        capacity: "100 мл",
        price: 200,
        amount: 1
      },
      {
        image: "/img/product-image-preview-1.png",
        title: "Тонік для обличчя \"Трояндова роса\"",
        capacity: "100 мл",
        price: 200,
        amount: 1
      },
      {
        image: "/img/product-image-preview-1.png",
        title: "Тонік для обличчя \"Трояндова роса\"",
        capacity: "100 мл",
        price: 200,
        amount: 1
      },
    // Add more items as needed
  ];

  const totalAmount = 200; // This can be calculated dynamically based on items

  const handleRemoveItem = (title) => {
    console.log(`Removing item: ${title}`);
  };

  const handleOrder = () => {
    console.log("Placing order...");
  };

  const closeModal = () => {
    setModalOpen(false);
    onClose && onClose();
};

  return (
    <div>
        <Modal isOpen={true} onClose={onClose}>
      <Cart items={items} totalAmount={totalAmount} onRemoveItem={handleRemoveItem} onOrder={handleOrder} />
      
      </Modal>
    </div>
  );
};

export default App;
