import React, { useState, useEffect } from "react";
import ApiConfig from "../../config/ApiConfig"; // Ваш API клиент
import PageBuilderComponent from "../../components/page_builder/PageBuilderComponent"
import "../../scss/style.scss";
import { useParams } from "react-router-dom";

const SearchResultPage = () => {
  const { query } = useParams(); // Получаем параметр запроса из URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiConfig.get(`/api/public/searchResult/${query}`);
        setData(response.data); // Устанавливаем полученные данные
      } catch (err) {
        console.error("Ошибка загрузки результатов поиска:", err.message);
        setError("Не удалось загрузить результаты поиска.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]); // Запуск при изменении query

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <PageBuilderComponent data={data} /> {/* Передаём данные в PageBuilderComponent */}
    </div>
  );
};

export default SearchResultPage;
