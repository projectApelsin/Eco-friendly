import React, { useState } from 'react';
import '../../../scss/style.scss';
import Modal from '../Modal';

const OrderForm = ({ onOpenRegister, onOpenForgotPassword, onClose, onOperationComplete }) => {
    const [formData, setFormData] = useState({
        city: '',
        mailOfficeNumber: '',
    });
    const [isModalOpen, setModalOpen] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null); // Храним выбранный чекбокс

    // Обработчик изменения данных формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Обработчик для чекбоксов
    const handleCheckboxChange = (checkboxName) => {
        // Если тот же чекбокс выбран, сбрасываем выбор, иначе выбираем новый
        setSelectedCheckbox(prev => prev === checkboxName ? null : checkboxName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose(); // Закрываем модальное окно
        setTimeout(() => {
            onOperationComplete('success', 'Успіх!', 'Ви успішно ввійшли в систему.');
        }, 300); // Показываем PopupBuilder
    };

    const closeModal = () => {
        setModalOpen(false);
        onClose && onClose();
    };

    return (
        <>
            {isModalOpen && (
                <Modal isOpen={true} onClose={onClose}>
                    <div className="modal-form is-visible">
                        <div className="modal-form__frame">
                            <div className="modal-form__container">
                                <div className="modal-form__header">
                                    <span className="modal-form__text">Оформлення замовлення</span>
                                    <img
                                        src={'img/close-icon.png'}
                                        alt="close-icon"
                                        className="modal-form__close-icon"
                                        onClick={closeModal} // Добавлен обработчик на крестик
                                    />
                                </div>
                                <div className="modal-form__content">
                                    <div className="modal-form__input-content">
                                        {/* Почта */}
                                        <div className="modal-form__input-group">
                                            <div className="modal-form__input-header-text">Введіть Ваше місто</div>
                                            <div className="modal-form__input-field">
                                                <div className="modal-form__input">
                                                    <div
                                                        className="editable"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onInput={(e) =>
                                                            handleChange({
                                                                target: { name: 'city', value: e.target.innerText },
                                                            })
                                                        }
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Чекбоксы */}
                                        <div className="modal-form__checkbox-content">
                                            <div
                                                className="modal-form__checkbox-group"
                                                onClick={() => handleCheckboxChange('rememberMe')}
                                            >
                                                <div className="modal-form__checkbox-image">
                                                    <img
                                                        src={
                                                            selectedCheckbox === 'rememberMe'
                                                                ? '/img/ri_checkbox-fill.png'
                                                                : '/img/ri_checkbox-empty.png'
                                                        }
                                                        alt="checkbox"
                                                        className="modal-form__checkbox-icon"
                                                    />
                                                </div>
                                                <label className="modal-form__input-header-text">У відділення “Укрпошта”</label>
                                            </div>
                                        </div>
                                        <div className="modal-form__checkbox-content">
                                            <div
                                                className="modal-form__checkbox-group"
                                                onClick={() => handleCheckboxChange('anotherOption')}
                                            >
                                                <div className="modal-form__checkbox-image">
                                                    <img
                                                        src={
                                                            selectedCheckbox === 'anotherOption'
                                                                ? '/img/ri_checkbox-fill.png'
                                                                : '/img/ri_checkbox-empty.png'
                                                        }
                                                        alt="checkbox"
                                                        className="modal-form__checkbox-icon"
                                                    />
                                                </div>
                                                <label className="modal-form__input-header-text">У відділення “Нова пошта”</label>
                                            </div>
                                        </div>

                                        {/* Пароль */}
                                        <div className="modal-form__input-group">
                                            <div className="modal-form__input-header-text">Введіть Ваше відділення пошти</div>
                                            <div className="modal-form__input-field">
                                                <div className="modal-form__input">
                                                    <div
                                                        className="editable"
                                                        contentEditable
                                                        suppressContentEditableWarning
                                                        onInput={(e) =>
                                                            handleChange({
                                                                target: { name: 'mailOfficeNumber', value: e.target.innerText },
                                                            })
                                                        }
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Кнопка подтверждения */}
                                        <div className="modal-form__confirm-content">
                                            <div className="modal-form__confirm-button" onClick={handleSubmit}>
                                                <div className="modal-form__confirm-button-text">Перейти до оплати</div>
                                            </div>
                                        </div>
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

export default OrderForm;
