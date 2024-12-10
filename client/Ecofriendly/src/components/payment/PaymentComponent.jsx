import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ApiConfig from "../../config/ApiConfig";

const PaymentComponent = ({ purchaseProductsId, price, quantity, formData, onOperationComplete }) => {
  useEffect(() => {
    const handlePayment = async () => {
      const orderData = {
        purchaseProductsId,
        price,
        city: formData.city,
        deliveryMethod: formData.deliveryMethod,
        postalOffice: formData.mailOfficeNumber,
        
      };
      try {
        const response = await ApiConfig.post("/api/customer/createOrder", orderData);
        const { data, signature } = response.data;

        // Создание формы для отправки на LiqPay в новой вкладке
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://www.liqpay.ua/api/3/checkout";
        form.target = "_blank";

        const dataInput = document.createElement("input");
        dataInput.type = "hidden";
        dataInput.name = "data";
        dataInput.value = data;

        const signatureInput = document.createElement("input");
        signatureInput.type = "hidden";
        signatureInput.name = "signature";
        signatureInput.value = signature;

        form.appendChild(dataInput);
        form.appendChild(signatureInput);
        document.body.appendChild(form);

        form.submit();
        onOperationComplete("success", "Успіх!", "Ваше замовлення створено.");
      } catch (error) {
        console.error("Помилка створення замовлення:", error.message);
        onOperationComplete("error", "Помилка!", "Не вдалося створити замовлення.");
      }
    };

    handlePayment(); // Автоматический вызов платежа
  }, []); // Пустой массив зависимостей гарантирует, что хук выполнится один раз при монтировании компонента

  return null; // Компонент ничего не отображает
};

PaymentComponent.propTypes = {
  purchaseProductsId: PropTypes.arrayOf(PropTypes.number).isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  onOperationComplete: PropTypes.func.isRequired,
};

export default PaymentComponent;
