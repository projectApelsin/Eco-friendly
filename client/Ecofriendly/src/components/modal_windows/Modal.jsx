import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../../scss/style.scss';

const Modal = ({ isOpen, onClose, children }) => {
  const overlayRef = useRef(null);
  const [clickedOverlay, setClickedOverlay] = useState(false);

  if (!isOpen) return null;

  const handleMouseDown = (e) => {
    // Определяем, был ли начат клик на самом оверлее
    if (e.target.classList.contains('modal-overlay')) {
      setClickedOverlay(true);
    } else {
      setClickedOverlay(false);
    }
  };

  const handleMouseUp = (e) => {
    // Закрываем окно только если `mousedown` и `mouseup` произошли на оверлее
    if (clickedOverlay && e.target.classList.contains('modal-overlay')) {
      onClose();
    }
    setClickedOverlay(false); // Сбрасываем состояние
  };

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="modal-content-wrapper"
        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на содержимое
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
