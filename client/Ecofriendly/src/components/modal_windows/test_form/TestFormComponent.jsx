import React, { useState } from "react";
import "../../../scss/style.scss";
import Modal from "../Modal";
import ApiConfig from "../../../config/ApiConfig";

const TestModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({}); // Для хранения ответов

  const steps = [
    {
      id: 1,
      question: "Який у вас тип шкіри?",
      options: [
        { id: "SUKHA", label: "Суха", image: "/img/skin-dry.png" },
        { id: "ZHYRNA", label: "Жирна", image: "/img/skin-oily.png" },
        { id: "KOMBINOVANA", label: "Комбінована", image: "/img/skin-combination.png" },
        { id: "CHUTLYVA", label: "Чутлива", image: "/img/skin-sensitive.png" },
        { id: "NORMALNA", label: "Нормальна", image: "/img/skin-normal.png" },
      ],
      progressImage: "/img/progress-step-1.png",
    },
    {
      id: 2,
      question: "Чого ви хочете досягти у догляді за шкірою?",
      options: [
        { id: "USUNENNYA_ZHYRNOHO_BLYSKU", label: "Усунення жирного блиску", image: "/img/reduce-shine.png" },
        { id: "ZMENSENNYA_VYSYPIV", label: "Зменшення висипів", image: "/img/reduce-acne.png" },
        { id: "ZVOLOZHENNYA", label: "Зволоження", image: "/img/hydration.png" },
        { id: "VYRYVNENNYA_TONU_SHKIRY", label: "Вирівнювання тону шкіри", image: "/img/tone-evening.png" },
      ],
      progressImage: "/img/progress-step-2.png",
    },
    {
      id: 3,
      conclusion: "Висновок",
      text: "Для вашого типу шкіри та вашої мети ми можемо порекомендувати товари, які вам у цьому допоможуть.",
      progressImage: "/img/progress-step-3.png",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null); // Сброс выбранной опции для следующего шага
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setAnswers((prev) => ({
      ...prev,
      [currentStep === 1 ? "skin" : "goal"]: optionId,
    }));
  };

  const handleSubmit = async () => {
    try {
      await ApiConfig.post("/api/customer/addProductInfoToCustomer", answers);
      onClose(); // Закрываем модальное окно после успешного запроса
    } catch (err) {
      console.error("Ошибка отправки данных:", err.message);
    }
  };

  const renderStepContent = () => {
    const step = steps.find((s) => s.id === currentStep);

    if (currentStep < steps.length) {
      return (
        <>
          <p className="modal-form-test__question">{step.question}</p>
          <div className="modal-form-test__options">
            {step.options.map((option) => (
              <div
                key={option.id}
                className={`modal-form-test__option ${selectedOption === option.id ? "selected" : ""}`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <img
                  src={
                    selectedOption === option.id
                      ? "/img/ri_checkbox-fill.png"
                      : "/img/ri_checkbox-empty.png"
                  }
                  alt={option.label}
                  className="modal-form-test__option-icon"
                />
                <p className="modal-form-test__option-title">{option.label}</p>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <>
          <h3 className="modal-form-test__conclusion-title">{step.conclusion}</h3>
          <p className="modal-form-test__conclusion-text">{step.text}</p>
        </>
      );
    }
  };

  const renderNavigation = () => {
    return (
      <div className="modal-form-test__navigation">
        {currentStep > 1 && (
          <div className="modal-form-test__button-previous" onClick={handleBack}>
            <p className="modal-form-test__button-previous-text">Назад</p>
          </div>
        )}
        {currentStep < steps.length ? (
          <div
            className={`modal-form-test__button-next ${
              !selectedOption && currentStep < steps.length ? "disabled" : ""
            }`}
            onClick={selectedOption ? handleNext : undefined}
          >
            <p className="modal-form-test__button-next-text">Далі</p>
          </div>
        ) : (
          <div className="modal-form-test__button-next" onClick={handleSubmit}>
            <p className="modal-form-test__button-next-text">Продовжити</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="modal-form-test__container">
        <div className="modal-form-test__header-group">
          <img
            src={steps.find((s) => s.id === currentStep).progressImage}
            alt={`Прогрес ${currentStep}`}
            className="modal-form-test__progress-image"
          />
        </div>
        <div className="modal-form-test__content">{renderStepContent()}</div>
        {renderNavigation()}
      </div>
    </Modal>
  );
};

export default TestModal;
