import React from 'react';
import { Link } from 'react-router-dom';  // Импортируем Link для маршрутизации
import '../../scss/style.scss';


const CategoryComponent = () => {
    const categories = [
        "Догляд за обличчям",
        "Догляд за тілом",
        "Догляд за волоссям",
        "Догляд за нігтями",
        "Подарункові набори"
    ];

    const defaultImage = "img/arrow.png"; // Картинка по умолчанию для всех категорий

    return (
        <section className="categories">
            <div className='categories__banner'>
                {/* Используем Link для баннера */}
                <Link to="">
                    <img src='/banner.png' alt="Banner" />
                </Link>
            </div>
            <div className="categories__container">
                <div className="categories__content">
                    {categories.map((category, index) => (
                        <div key={index} className="categories__item">
                            {/* Используем Link для каждой категории */}
                            <Link to="">
                                <p className="categories__item-text">{category}</p>
                                <img src={defaultImage} alt="Categories arrow icon" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryComponent;
