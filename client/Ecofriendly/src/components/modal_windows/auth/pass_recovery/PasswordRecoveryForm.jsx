import React, { useState } from 'react';
import '../../../../scss/style.scss';
import Modal from '../../Modal';

const PasswordRecoveryForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isModalOpen, setModalOpen] = useState(true);
    const [error, setError] = useState(''); // Для отображения ошибки

    // Обработчик изменения данных формы
    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        // Проверка совпадения пароля
        if (password !== confirmPassword) {
            setError('Паролі не співпадають'); // Устанавливаем сообщение об ошибке
            return;
        }

        // Если все ок, можно отправить данные
        setError(''); // Очищаем ошибку
        console.log('Form data:', formData);
        closeModal(); // Закрываем модальное окно
    };

    // Обработчик для закрытия модального окна
    const closeModal = () => {
        setModalOpen(false);
        onClose && onClose();
    };

    return (
        
            <div className="modal-form is-visible">
                <div className="modal-form__frame">
                    <div className="modal-form__container">
                        <div className="modal-form__header">
                            <span className="modal-form__text">Відновлення паролю</span>
                            <img
                                src={'img/close-icon.png'}
                                alt="close-icon"
                                className="modal-form__close-icon"
                                onClick={closeModal}
                            />
                        </div>
                        <div className="modal-form__content">
                            <div className="modal-form__input-content">

                                {/* Почта */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Пошта</div>
                                    <div className="modal-form__input-field">
                                    <div className='modal-form__input'>
                                        <div
                                            className="editable"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onInput={(e) =>
                                                handleChange('email', e.target.innerText)
                                            }
                                        ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Пароль */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Пароль</div>
                                    <div className="modal-form__input-field">
                                        <div className='modal-form__input'>
                                        <div
                                            className="editable"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onInput={(e) =>
                                                handleChange('password', e.target.innerText)
                                            }
                                            style={{
                                                WebkitTextSecurity: 'disc', // Для скрытия символов
                                            }}
                                        ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Подтверждение пароля */}
                                <div className="modal-form__input-group">
                                    <div className="modal-form__input-header-text">Підтвердження паролю</div>
                                    <div className="modal-form__input-field">
                                    <div className='modal-form__input'>
                                        <div
                                            className="editable"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onInput={(e) =>
                                                handleChange('confirmPassword', e.target.innerText)
                                            }
                                            style={{
                                                WebkitTextSecurity: 'disc', // Для скрытия символов
                                            }}
                                        ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Сообщение об ошибке */}
                                {error && (
                                    <div className="modal-form__error">
                                        {error}
                                    </div>
                                )}

                                {/* Кнопка подтверждения */}
                                <div className="modal-form__confirm-content">
                                    <div
                                        className="modal-form__confirm-button"
                                        onClick={handleSubmit}
                                    >
                                        <div className="modal-form__confirm-button-text">
                                            Відновити пароль
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default PasswordRecoveryForm;
