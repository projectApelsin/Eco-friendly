import { useState } from 'react'
import HeaderComponent from './components/header/HeaderComponent'
import FooterComponent from './components/footer/FooterComponent'
import PageBuilderComponent from './components/page_builder/PageBuilderComponent'
import CategoryComponent from './components/category/CategoryComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCard from './components/product_card/ProductCard';
import ProductGroup from './components/product_group/ProductGroup';
import ProductList from './components/product_list/ProductList';
import RegistrationForm from './components/modal_windows/auth/register/RegistrationForm'
import LoginForm from './components/modal_windows/auth/login/LoginForm'
import AuthModalManager from './components/modal_windows/auth/AuthModalManager'
import PopupBuilder from './components/modal_windows/popup/PopupBuilder'
import Cart from './components/modal_windows/cart/Cart'
import OrderForm from './components/modal_windows/order/OrderForm'
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import HomePage from './pages/HomePage/HomePage'
import SearchResultPage from './pages/SearchResultPage/SearchResultPage'
import SubcategoryPage from './pages/SubcategoryPage/SubcategoryPage'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import WishlistPage from './pages/WishlistPage/WishlistPage'


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />

        {/* Страница результатов поиска */}
        <Route path="/search/:query" element={<SearchResultPage />} />

        {/* Страница деталей продукта */}
        <Route path="/productDetails/:productId" element={<ProductDetailsPage />} />

        <Route path="/subcategory/:subcategoryId" element={<SubcategoryPage />} />

        <Route path="/category/:categoryId" element={<CategoryPage />} />

        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Добавьте другие маршруты по мере необходимости */}
      </Routes>
    </Router>
  );
};
export default App
