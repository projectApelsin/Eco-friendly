package com.e_commerce.eco_friendly.Enum.form;



public enum GoalType {
    USUNENNYA_ZHYRNOHO_BLYSKU("Усунення жирного блиску"),
    ZMENSENNYA_VYSYPIV("Зменшення висипів"),
    ZVOLOZHENNYA("Зволоження"),
    VYRYVNENNYA_TONU_SHKIRY("Вирівнювання тону шкіри");

    private final String description;


    GoalType(String description) {
        this.description = description;
    }


    public String getDescription() {
        return description;
    }
}
