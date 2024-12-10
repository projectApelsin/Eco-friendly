import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../scss/style.scss";
import Modal from "../Modal";
import PaymentComponent from "../../payment/PaymentComponent";

const OrderForm = ({ purchaseProductsId, price, quantity, onClose, onOperationComplete }) => {
  const [formData, setFormData] = useState({
    city: "",
    mailOfficeNumber: "",
    deliveryMethod: "",
  });
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checkboxName) => {
    const deliveryMethod =
      checkboxName === "rememberMe" ? "Укрпошта" : checkboxName === "anotherOption" ? "Нова Пошта" : "";

    setSelectedCheckbox((prev) => (prev === checkboxName ? null : checkboxName));
    setFormData((prevData) => ({
      ...prevData,
      deliveryMethod: deliveryMethod || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.city || !formData.mailOfficeNumber || !formData.deliveryMethod) {
      onOperationComplete("error", "Помилка!", "Будь ласка, заповніть усі поля.");
      return;
    }

    setSubmitting(true);
  };

  const handlePaymentComplete = (type, title, message) => {
    onOperationComplete(type, title, message);

    // Закрываем окно и перезагружаем страницу после завершения оплаты
    if (type === "success") {
      setModalOpen(false);
      onClose && onClose();
      window.location.reload(); // Перезагрузка страницы
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    onClose && onClose();
  };

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={true} onClose={closeModal}>
          <div className="modal-form is-visible">
            <div className="modal-form__frame">
              <div className="modal-form__container">
                <div className="modal-form__header">
                  <span className="modal-form__text">Оформлення замовлення</span>
                  <img
                    src={"img/close-icon.png"}
                    alt="close-icon"
                    className="modal-form__close-icon"
                    onClick={closeModal}
                  />
                </div>
                <div className="modal-form__content">
                  <div className="modal-form__input-content">
                    <div className="modal-form__input-group">
                      <div className="modal-form__input-header-text">Введіть Ваше місто</div>
                      <div className="modal-form__input-field">
                        <input
                          type="text"
                          name="city"
                          className="modal-form__input"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="modal-form__checkbox-content">
                      <div className="modal-form__checkbox-group" onClick={() => handleCheckboxChange("rememberMe")}>
                        <div className="modal-form__checkbox-image">
                          <img
                            src={
                              selectedCheckbox === "rememberMe"
                                ? "/img/ri_checkbox-fill.png"
                                : "/img/ri_checkbox-empty.png"
                            }
                            alt="checkbox"
                            className="modal-form__checkbox-icon"
                          />
                        </div>
                        <label className="modal-form__input-header-text">У відділення “Укрпошта”</label>
                      </div>
                      <div className="modal-form__checkbox-group" onClick={() => handleCheckboxChange("anotherOption")}>
                        <div className="modal-form__checkbox-image">
                          <img
                            src={
                              selectedCheckbox === "anotherOption"
                                ? "/img/ri_checkbox-fill.png"
                                : "/img/ri_checkbox-empty.png"
                            }
                            alt="checkbox"
                            className="modal-form__checkbox-icon"
                          />
                        </div>
                        <label className="modal-form__input-header-text">У відділення “Нова Пошта”</label>
                      </div>
                    </div>

                    <div className="modal-form__input-group">
                      <div className="modal-form__input-header-text">Введіть Ваше відділення пошти</div>
                      <div className="modal-form__input-field">
                        <input
                          type="text"
                          name="mailOfficeNumber"
                          className="modal-form__input"
                          value={formData.mailOfficeNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-form__confirm-content">
                    {isSubmitting ? (
                      <PaymentComponent
                        purchaseProductsId={purchaseProductsId}
                        price={price}
                        quantity={quantity}
                        formData={formData}
                        onOperationComplete={handlePaymentComplete} // Передаем обработчик завершения оплаты
                      >
                        Перейти до оплати
                      </PaymentComponent>
                    ) : (
                      <button className="modal-form__confirm-button" onClick={handleSubmit}>
                        <div className="modal-form__confirm-button-text">Перейти до оплати</div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

OrderForm.propTypes = {
  purchaseProductsId: PropTypes.arrayOf(PropTypes.number).isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onOperationComplete: PropTypes.func.isRequired,
};

export default OrderForm;
