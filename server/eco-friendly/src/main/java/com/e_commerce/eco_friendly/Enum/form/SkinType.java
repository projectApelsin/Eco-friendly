package com.e_commerce.eco_friendly.Enum.form;

public enum SkinType {
    SUKHA("Суха"),
    ZHYRNA("Жирна"),
    KOMBINOVANA("Комбінована"),
    CHUTLYVA("Чутлива"),
    NORMALNA("Нормальна");

    private final String description;

    // Конструктор
    SkinType(String description) {
        this.description = description;
    }

    // Метод для получения описания
    public String getDescription() {
        return description;
    }
}
