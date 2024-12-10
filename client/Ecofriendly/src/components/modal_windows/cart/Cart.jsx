import React, { useState, useEffect } from "react";
import ApiConfig from "../../../config/ApiConfig"; // Импорт API клиента
import Modal from "../Modal";
import OrderForm from "../order/OrderForm";
import PopupBuilder from "../popup/PopupBuilder"; // Попап компонент
import "../../../scss/style.scss";

const CartItem = ({ id, image, title, capacity, price, amount, onRemove, onChangeQuantity }) => (
  <div className="cart__item">
    <div className="cart__item-image">
      <img src={"/img/" + image} alt={title} />
    </div>
    <div className="cart__item-details">
      <p className="cart__item-title">{title}</p>
      <p className="cart__item-capacity">Об’єм: {capacity}</p>
      <div className="cart__info-amount">
        <svg
          className="cart__info-amount-icon"
          width="3.3vh"
          height="3.2vh"
          viewBox="0 0 33 32"
          fill="none"
          stroke="#0E0F0E"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => onChangeQuantity(id, -1)}
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
          onClick={() => onChangeQuantity(id, 1)}
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
    <div className="cart__item-price">{price ? `${price} ₴` : "Ціна не вказана"}</div>
    <svg
      className="cart__item-remove"
      width="2.6vh"
      height="2.6vh"
      viewBox="0 0 26 26"
      fill="#0E0F0E"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onRemove(id)}
    >
      <path
        d="M7.5835 22.75C6.98766 22.75 6.47777 22.538 6.05383 22.1141C5.62988 21.6901 5.41755 21.1799 5.41683 20.5833V6.5H4.3335V4.33333H9.75016V3.25H16.2502V4.33333H21.6668V6.5H20.5835V20.5833C20.5835 21.1792 20.3715 21.6894 19.9476 22.1141C19.5236 22.5388 19.0134 22.7507 18.4168 22.75H7.5835ZM18.4168 6.5H7.5835V20.5833H18.4168V6.5ZM9.75016 18.4167H11.9168V8.66667H9.75016V18.4167ZM14.0835 18.4167H16.2502V8.66667H14.0835V18.4167Z"
      />
    </svg>
  </div>
);

const Cart = ({ items, totalAmount, onRemoveItem, onChangeQuantity, onOrder }) => (
  <section className="cart">
    <div className="cart__top">
      <p className="cart__top-title">Корзина</p>
    </div>
    <div className="cart__content">
      <div className="cart__items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            capacity={item.capacity}
            price={item.price}
            amount={item.amount}
            onRemove={onRemoveItem}
            onChangeQuantity={onChangeQuantity}
          />
        ))}
      </div>
      <div className="cart__summary">
        <div className="cart__summary-total">
          <p className="cart__summary-text">Загальна сума:</p>
          <p className="cart__summary-amount">{totalAmount} ₴</p>
        </div>
        <button className="cart__summary-order" onClick={onOrder}>
          Оформити замовлення
        </button>
      </div>
    </div>
  </section>
);

const App = ({ onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [popupProps, setPopupProps] = useState({ isOpen: false, type: "", mainText: "", subText: "" });

  const showPopup = (type, mainText, subText) => setPopupProps({ isOpen: true, type, mainText, subText });
  const closePopup = () => setPopupProps({ isOpen: false });

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await ApiConfig.get("/api/customer/getProductsFromShoppingCart");
      setItems(response.data);
    } catch (err) {
      console.error("Ошибка при загрузке корзины:", err.message);
      showPopup("error", "Помилка!", "Не вдалося завантажити корзину.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await ApiConfig.delete(`/api/customer/deleteFromShoppingCart/${id}`);
      fetchCartItems(); // Обновляем корзину после успешного удаления
      showPopup("success", "Успіх!", "Товар успішно видалено з корзини.");
    } catch (err) {
      console.error("Ошибка при удалении товара из корзины:", err.message);
      showPopup("error", "Помилка!", "Не вдалося видалити товар з корзини.");
    }
  };

  const handleChangeQuantity = async (id, change) => {
    try {
      await ApiConfig.put(`/api/customer/changeProductQuantity/${id}/${change}`);
      fetchCartItems(); // Обновляем корзину после изменения количества
      showPopup("success", "Успіх!", "Кількість товару оновлено.");
    } catch (err) {
      console.error("Ошибка при изменении количества товара:", err.message);
      showPopup("error", "Помилка!", "Не вдалося оновити кількість товару.");
    }
  };

  const handleOrder = async () => {
    try {
      await fetchCartItems(); // Перезагружаем корзину перед оформлением
      setOrderModalOpen(true);
    } catch {
      showPopup("error", "Помилка!", "Не вдалося оновити корзину перед замовленням.");
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price || 0) * item.amount, 0);

  if (loading) return <div>Загрузка корзины...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <Cart
          items={items}
          totalAmount={totalAmount}
          onRemoveItem={handleRemoveItem}
          onChangeQuantity={handleChangeQuantity}
          onOrder={handleOrder}
        />
      </Modal>

      {isOrderModalOpen && (
        <OrderForm
          purchaseProductsId={items.map((item) => item.id)}
          price={totalAmount}
          quantity={items.reduce((sum, item) => sum + item.amount, 0)}
          onClose={() => setOrderModalOpen(false)}
          onOperationComplete={showPopup}
        />
      )}

      <PopupBuilder {...popupProps} onClose={closePopup} />
    </>
  );
};
export default App;
