import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig"; // Подключаем ваш API-клиент
import "../../scss/style.scss";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 3) {
      try {
        const response = await ApiConfig.get(`/api/public/fastSearch/${input}`);
        setResults(response.data.slice(0, 4)); // Ограничиваем количество результатов на клиенте
      } catch (error) {
        console.error("Ошибка при выполнении поиска:", error.response?.data || error.message);
        setResults([]); // Очищаем результаты в случае ошибки
      }
    } else {
      setResults([]); // Если запрос слишком короткий, очищаем результаты
    }
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleCardClick = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsActive(false);
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const firstGroup = results.slice(0, Math.ceil(results.length / 2));
  const secondGroup = results.slice(Math.ceil(results.length / 2));

  return (
    <div className="header__search" ref={searchRef}>
      <input
        type="text"
        className={`header__search-input ${isActive ? "active" : ""}`}
        placeholder="Пошук"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        style={{
          backgroundColor: isActive ? "rgba(2, 62, 0, 0.8)" : "rgba(189, 255, 187, 0.4)",
          color: isActive ? "#FEFFFE" : "#000000",
        }}
      />
      <img
        className={`header__search-icon ${isActive ? "active-icon" : ""}`}
        src={isActive ? "/img/white_search.png" : "/img/search.png"}
        alt="Search icon"
      />
      {isActive && results.length > 0 && (
        <div className="search__container">
          <div className="search__group">
            {firstGroup.map((product) => (
              <div
                key={product.id}
                className="search__card"
                onClick={() => handleCardClick(product.id)}
              >
                <div className="search__card-top">
                  <img
                    src={'/img/' + product.image}
                    alt={product.title}
                    className="search__card-icon"
                  />
                </div>
                <div className="search__text">{product.title}</div>
                <div className="search__text">
                  {product.discountPrice || product.price} ₴
                </div>
              </div>
            ))}
          </div>
          <div className="search__group">
            {secondGroup.map((product) => (
              <div
                key={product.id}
                className="search__card"
                onClick={() => handleCardClick(product.id)}
              >
                <div className="search__card-top">
                  <img
                    src={'/img/' + product.image}
                    alt={product.title}
                    className="search__card-icon"
                  />
                </div>
                <div className="search__text">{product.title}</div>
                <div className="search__text">
                  {product.discountPrice || product.price} ₴
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
