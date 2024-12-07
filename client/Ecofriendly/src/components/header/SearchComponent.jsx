import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/style.scss";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const mockData = [
    { id: 1, title: "Крем для обличчя 'Роза та Гречка'", price: 100, cardImage: "img/card-image.png" },
    { id: 2, title: "Крем для обличчя 'Роза та Гречка'", price: 200, cardImage: "img/card-image.png" },
    { id: 3, title: "Крем для обличчя 'Роза та Гречка'", price: 300, cardImage: "img/card-image.png" },
    { id: 4, title: "Крем для обличчя 'Роза та Гречка'", price: 400, cardImage: "img/card-image.png" },
  ];

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 3) {
      const filteredResults = mockData.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
      );
      setResults(filteredResults.slice(0, 4)); // Берем максимум 4 результата
    } else {
      setResults([]);
    }
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleCardClick = (id) => {
    navigate(`/productDetails/${id}`);
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
        style={{
          backgroundColor: isActive ? "#023E00" : "rgba(189, 255, 187, 0.3)",
          color: isActive ? "#FEFFFE" : "#000000",
        }}
      />
      <img
        className={`header__search-icon ${isActive ? "active-icon" : ""}`}
        src={isActive ? "img/white_search.png" : "img/search.png"}
        alt="Search icon"
      />
      {isActive && results.length > 0 && (
        <div className="search__container">
          <div className="search__group">
            {firstGroup.map((product) => (
              <div
                key={product.id}
                className="search__card"
                onClick={() => handleCardClick(product.id)} // Переход по ID
              >
                <div className="search__card-top">
                  <img
                    src={product.cardImage}
                    alt={product.title}
                    className="search__card-icon"
                  />
                </div>
                <div className="search__text">{product.title}</div>
                <div className="search__text">{product.price} ₴</div>
              </div>
            ))}
          </div>
          <div className="search__group">
            {secondGroup.map((product) => (
              <div
                key={product.id}
                className="search__card"
                onClick={() => handleCardClick(product.id)} // Переход по ID
              >
                <div className="search__card-top">
                  <img
                    src={product.cardImage}
                    alt={product.title}
                    className="search__card-icon"
                  />
                </div>
                <div className="search__text">{product.title}</div>
                <div className="search__text">{product.price} ₴</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
