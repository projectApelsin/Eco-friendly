import React, { useState } from 'react';
import '../../../../scss/style.scss';
import ApiConfig from '../../../../config/ApiConfig';

const RegistrationForm = ({ onClose, onOperationComplete }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        consentData: false,
        consentNewsletter: false,
    });
    const [error, setError] = useState(''); // Для отображения ошибки

    // Обработчик изменения данных формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Обработчик для чекбоксов
    const handleCheckboxChange = (name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: !prevData[name],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        // Проверка совпадения пароля
        if (password !== confirmPassword) {
            setError('Паролі не співпадають'); // Устанавливаем сообщение об ошибке
            return;
        }

        // Если все ок, очищаем ошибку
        setError('');

        try {
            // Отправляем данные на сервер
            const response = await ApiConfig.post('/api/auth/register', formData);
            console.log('Успішна реєстрація:', response.data);

            // Закрываем модальное окно
            onClose();

            // Вызываем колбек для успешной операции
            onOperationComplete('success', 'Успіх!', 'Ви успішно зареєструвалися.');
        } catch (error) {
            console.error('Помилка реєстрації:', error.response?.data?.message || error.message);

            // Вызываем колбек для ошибки
            onOperationComplete('error', 'Помилка!', 'Щось пішло не так. Спробуйте ще раз.');
        }
    };

    return (
        <>
            <div className="modal-form is-visible">
                <div className="modal-form__frame">
                    <div className="modal-form__container">
                        <div className="modal-form__header">
                            <span className="modal-form__text">Реєстрація</span>
                            <img
                                src={'img/close-icon.png'}
                                alt="close-icon"
                                className="modal-form__close-icon"
                                onClick={onClose}
                            />
                        </div>
                        <div className="modal-form__content">
                            <div className="modal-form__input-content">
                                {/* Имя пользователя */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Имя користувача</div>
                                    <textarea
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="modal-form__input"
                                        placeholder="Введіть ваше ім'я"
                                    />
                                </div>

                                {/* Фамилия пользователя */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Прізвище</div>
                                    <textarea
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="modal-form__input"
                                        placeholder="Введіть ваше прізвище"
                                    />
                                </div>

                                {/* Почта */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Почта</div>
                                    <textarea
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="modal-form__input"
                                        placeholder="Введіть вашу пошту"
                                    />
                                </div>

                                {/* Номер телефона */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Номер телефону</div>
                                    <textarea
                                        name="phone"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="modal-form__input"
                                        placeholder="Введіть ваш номер телефону"
                                    />
                                </div>

                                {/* Пароль */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Пароль</div>
                                    <textarea
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="modal-form__input"
                                        placeholder="Введіть ваш пароль"
                                    />
                                </div>

                                {/* Подтверждение пароля */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Підтвердження паролю</div>
                                    <textarea
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="modal-form__input"
                                        placeholder="Підтвердіть ваш пароль"
                                    />
                                </div>

                                {/* Чекбоксы */}
                                <div className="modal-form__checkbox-content">
                                    {/* Чекбокс "Я даю згоду на обробку персональних даних" */}
                                    <div
                                        className="modal-form__checkbox-group"
                                        onClick={() => handleCheckboxChange('consentData')}
                                    >
                                        <div className="modal-form__checkbox-image">
                                            <img
                                                src={
                                                    formData.consentData
                                                        ? '/img/ri_checkbox-fill.png'
                                                        : '/img/ri_checkbox-empty.png'
                                                }
                                                alt="checkbox"
                                                className="modal-form__checkbox-icon"
                                            />
                                        </div>
                                        <label className="modal-form__checkbox-text">
                                            Я даю згоду на обробку персональних даних
                                        </label>
                                    </div>

                                    {/* Чекбокс "Я бажаю отримувати розсилку" */}
                                    <div
                                        className="modal-form__checkbox-group"
                                        onClick={() => handleCheckboxChange('consentNewsletter')}
                                    >
                                        <div className="modal-form__checkbox-image">
                                            <img
                                                src={
                                                    formData.consentNewsletter
                                                        ? '/img/ri_checkbox-fill.png'
                                                        : '/img/ri_checkbox-empty.png'
                                                }
                                                alt="checkbox"
                                                className="modal-form__checkbox-icon"
                                            />
                                        </div>
                                        <label className="modal-form__checkbox-text">
                                            Я бажаю отримувати розсилку
                                        </label>
                                    </div>
                                </div>

                                {/* Сообщение об ошибке */}
                                {error && <div className="modal-form__error">{error}</div>}

                                {/* Кнопка подтверждения */}
                                <div className="modal-form__confirm-content">
                                    <div className="modal-form__confirm-button" onClick={handleSubmit}>
                                        <div className="modal-form__confirm-button-text">Зареєструватися</div>
                                    </div>
                                    <div className="modal-form__confirm-text-group">
                                        <span className="modal-form__confirm-default-text">
                                            Реєструючись, Ви погоджуєтесь з
                                            <div className="modal-form__confirm-link-text">
                                                Угодою користувача та Політикою конфіденційності.
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrationForm;
