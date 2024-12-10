import React, { useState } from 'react';
import '../../../../scss/style.scss';
import ApiConfig from '../../../../config/ApiConfig';

const LoginForm = ({ onOpenRegister, onOpenForgotPassword, onClose, onOperationComplete }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isModalOpen, setModalOpen] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Обработчик изменения данных формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправляем данные на сервер
            const response = await ApiConfig.post('/api/auth/login', formData);
            console.log('Успішний вхід:', response.data);

            // Закрываем модальное окно
            onClose();

            // Вызываем функцию для успешной операции
            onOperationComplete('success', 'Успіх!', 'Ви успішно ввійшли в систему.');
        } catch (error) {
            console.error('Помилка входу:', error.response?.data?.message || error.message);

            // Вызываем функцию для неудачной операции
            onOperationComplete('error', 'Помилка!', 'Невірний логін або пароль.');
        }
    };

    // Обработчик для закрытия модального окна
    const closeModal = () => {
        setModalOpen(false);
        onClose && onClose();
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal-form is-visible">
                    <div className="modal-form__frame">
                        <div className="modal-form__container">
                            <div className="modal-form__header">
                                <span className="modal-form__text">Вхід</span>
                                <img
                                    src={'/img/close-icon.png'}
                                    alt="close-icon"
                                    className="modal-form__close-icon"
                                    onClick={closeModal} // Добавлен обработчик на крестик
                                />
                            </div>
                            <div className="modal-form__content">
                                <div className="modal-form__input-content">
                                    {/* Почта */}
                                    <div className="modal-form__input-group">
                                        <div className="modal-form__input-header-text">Почта</div>
                                        
                                            <textarea
                                                
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="modal-form__input"
                                                placeholder="Введіть вашу пошту"
                                            ></textarea>
                                        
                                    </div>

                                    {/* Пароль */}
                                    <div className="modal-form__input-group">
                                        <div className="modal-form__input-header-text">Пароль</div>
                                        <div className="modal-form__input-field">
                                            <textarea
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="modal-form__input"
                                                placeholder="Введіть ваш пароль"
                                                style={{
                                                    WebkitTextSecurity: passwordVisible ? 'none' : 'disc', // Для отображения / скрытия пароля
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Кнопка подтверждения */}
                                    <div className="modal-form__confirm-content">
                                        <div className="modal-form__confirm-button" onClick={handleSubmit}>
                                            <div className="modal-form__confirm-button-text">Увійти</div>
                                        </div>
                                        <div className="modal-form__confirm-text-group">
                                            <span className="modal-form__confirm-default-text">
                                                <div
                                                    className="modal-form__confirm-link-text"
                                                    onClick={onOpenForgotPassword}
                                                >
                                                    Забули пароль?
                                                </div>
                                            </span>
                                            <span className="modal-form__confirm-default-text">або</span>
                                            <span className="modal-form__confirm-default-text">
                                                <div className="modal-form__confirm-link-text" onClick={onOpenRegister}>
                                                    Зареєструватися
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginForm;
