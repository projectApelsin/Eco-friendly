import { useState } from 'react'
import HeaderComponent from './components/header/HeaderComponent'
import FooterComponent from './components/footer/FooterComponent'
import PageBuilderComponent from './components/page_builder/PageBuilderComponent'
import CategoryComponent from './components/category/CategoryComponent'
import { BrowserRouter as Router } from 'react-router-dom';
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

function App() {
  const [count, setCount] = useState(0)

  const productGroups = [
    {
      title: 'Бестселлери',
      products: [
        {
          productId: '1',
          title: 'Крем для обличчя "Лавандова ніжність"',
          name: 'Лавандова ніжність',
          image: 'img/card-image.png',
          discountPrice: 350,
          price: 569,
          stars: 4,
        },
        {
          productId: '2',
          title: 'Крем для обличчя "Роза та Гречка"',
          name: 'Роза та Гречка',
          image: 'img/card-image.png',
          discountPrice: 400,
          price: 600,
          stars: 5,
        },
      ],
    },
    {
      title: 'Новинки',
      products: [
        {
          productId: '3',
          title: 'Сироватка для обличчя "Морська свіжість"',
          name: 'Морська свіжість',
          image: 'img/card-image.png',
          discountPrice: 500,
          price: 700,
          stars: 5,
        },
        {
          productId: '4',
          title: 'Крем для рук "Тепла ваніль"',
          name: 'Тепла ваніль',
          image: 'img/card-image.png',
          discountPrice: 250,
          price: 350,
          stars: 4,
        },
      ],
    },
    {
      title: 'Знижки',
      products: [
        {
          productId: '5',
          title: 'Шампунь "Сила природи"',
          name: 'Сила природи',
          image: 'img/card-image.png',
          discountPrice: 300,
          price: 450,
          stars: 3,
        },
        {
          productId: '6',
          title: 'Гель для душу "Цитрусова хвиля"',
          name: 'Цитрусова хвиля',
          image: 'img/card-image.png',
          discountPrice: 200,
          price: 300,
          stars: 4,
        },
      ],
    },
  ];
  

  return (
    <>
    <Router>
    {//<PageBuilderComponent data = {productGroups}/>
}<ProductDetailsPage/>
      
     </Router>
    </>
  )
}

export default App
