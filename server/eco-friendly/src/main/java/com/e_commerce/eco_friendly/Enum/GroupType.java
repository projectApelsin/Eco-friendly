package com.e_commerce.eco_friendly.Enum;


public enum GroupType {
    SUBCATEGORY("subcategory"),
    RECOMMENDATION("recommendation"),
    DISCOUNT("discount"),
    BESTSELLER("bestseller");

    private final String type;

    GroupType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return type;
    }

    /**
     * Метод для поиска типа группы по строковому значению.
     *
     * @param type строковое значение типа группы
     * @return соответствующий enum GroupType или null, если тип не найден
     */
    public static GroupType fromString(String type) {
        for (GroupType groupType : GroupType.values()) {
            if (groupType.type.equalsIgnoreCase(type)) {
                return groupType;
            }
        }
        throw new IllegalArgumentException("Unknown GroupType: " + type);
    }
}
