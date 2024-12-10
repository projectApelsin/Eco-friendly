import React from 'react';
import '../../../scss/style.scss';
import Modal from '../Modal'; // Компонент модального окна

const PopupBuilder = ({ isOpen, onClose, type, mainText, subText }) => {
    // Определяем путь к картинке в зависимости от типа
    const getImageSrc = () => {
        switch (type) {
            case 'success':
                return '/img/success-icon.png';
            case 'error':
                return '/img/fail-icon.png';
            case 'auth-required':
                return '/img/auth-icon.png'; 
            default:
                return '/img/-icon.png';
        }
    };

    const imageSrc = getImageSrc();

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-popup__container">
                <div className="modal-popup__close-icon-group" onClick={onClose}>
                    <img
                        src="/img/close-icon.png"
                        alt="Close"
                        className="modal-popup__close-icon"
                    />
                </div>
                <div className="modal-popup__content">
                    {/* Иконка */}
                    <div className="modal-popup__content-icon">
                        <img src={imageSrc} alt={`${type} icon`} className='modal-popup__content-icon' />
                    </div>

                    {/* Группа текста */}
                    <div className="modal-popup__content-text-group">
                        <div className="modal-popup__content-text-main">{mainText}</div>
                        {subText && (
                            <div className="modal-popup__content-text-other">{subText}</div>
                        )}
                        
                    </div>
                </div>

                {/* Иконка закрытия */}
                
            </div>
        </Modal>
    );
};

export default PopupBuilder;
