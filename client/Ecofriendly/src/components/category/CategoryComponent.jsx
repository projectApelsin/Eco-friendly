import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Для маршрутизации
import ApiConfig from "../../config/ApiConfig"; // Импорт API клиента
import "../../scss/style.scss";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiConfig.get("/api/public/categoryTitles");
        setCategories(response.data); // Устанавливаем данные категорий
        setLoading(false);
      } catch (err) {
        console.error("Ошибка при загрузке категорий:", err.message);
        setError("Не удалось загрузить категории");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Загрузка категорий...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="categories">
      <div className="categories__banner">
        {/* Баннер с общим переходом */}
        <Link to="/">
          <img src="/banner.png" alt="Banner" />
        </Link>
      </div>
      <div className="categories__container">
        <div className="categories__content">
          {categories.map((category) => (
            <div key={category.id} className="categories__item">
              {/* Кликабельный элемент категории */}
              <Link to={`/category/${category.id}`}>
                <p className="categories__item-text">{category.title}</p>
                <img src="/img/arrow.png" alt="Categories arrow icon" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryComponent;
