import React, { useState, useEffect } from "react";
import ApiConfig from "../../config/ApiConfig"; // Ваш API клиент
import PageBuilderComponent from "../../components/page_builder/PageBuilderComponent";
import "../../scss/style.scss";
import { useParams } from "react-router-dom";

const HomePageCategoryDetails = () => {
  const { query } = useParams(); // Получаем параметр запроса из URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Используем query из URL для запроса к серверу
        const response = await ApiConfig.get(`/api/public/homePageCategoryDetails/${query}`);
        setData(response.data); // Устанавливаем полученные данные
      } catch (err) {
        console.error("Ошибка загрузки данных категории:", err.message);
        setError("Не удалось загрузить данные категории.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [query]); // Запуск при изменении query

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-category-details-page">
      <PageBuilderComponent data={data} /> {/* Передаём данные в PageBuilderComponent */}
    </div>
  );
};

export default HomePageCategoryDetails;
