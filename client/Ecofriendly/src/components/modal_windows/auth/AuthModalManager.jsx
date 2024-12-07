import React, { useState } from 'react';
import LoginForm from './login/LoginForm';
import RegistrationForm from './register/RegistrationForm';
import PasswordRecoveryForm from './pass_recovery/PasswordRecoveryForm';
import Modal from '../Modal'; // Ваш компонент Modal

const AuthModalManager = ({ onClose, onOperationComplete}) => {
    const [currentModal, setCurrentModal] = useState('login'); // 'login', 'register', 'forgotPassword'

    // Функции для переключения между окнами
    const openLoginModal = () => setCurrentModal('login');
    const openRegisterModal = () => setCurrentModal('register');
    const openForgotPasswordModal = () => setCurrentModal('forgotPassword');

    // Рендер текущей модальной формы
    const renderCurrentModal = () => {
        switch (currentModal) {
            case 'login':
                return (
                    <LoginForm
                        onOpenRegister={openRegisterModal}
                        onOpenForgotPassword={openForgotPasswordModal}
                        onClose={onClose} // Передаем функцию закрытия
                        onOperationComplete={onOperationComplete}
                    />
                );
            case 'register':
                return (
                    <RegistrationForm
                        onOpenLogin={openLoginModal}
                        onClose={onClose}
                        onOperationComplete={onOperationComplete}
                    />
                );
            case 'forgotPassword':
                return (
                    <PasswordRecoveryForm
                        onOpenLogin={openLoginModal}
                        onClose={onClose}
                        onOperationComplete={onOperationComplete}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            {renderCurrentModal()}
        </Modal>
    );
};

export default AuthModalManager;
