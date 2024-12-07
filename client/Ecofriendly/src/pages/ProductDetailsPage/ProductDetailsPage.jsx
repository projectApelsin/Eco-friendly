import React from 'react';
import ProductInfoComponent from '../../components/product_details/ProductInfoComponent';
import ProductReviewComponent from '../../components/product_details/ProductReviewComponent';
import ProductTopComponent from '../../components/product_details/ProductTopComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import ProductGroup from '../../components/product_group/ProductGroup';

const ProductDetailsPage = () => {
  // Мок-данные для каждого компонента

  // Мок-данные для карточки товара
  const product = {
    name: 'Тонік для обличчя "Трояндова роса"',
    price: 250,
    image: 'assets/uploads/creatine/BiotechCreaZero320g.jpg',
    discount: '10%',
    rating: 4,
    description: 'Освіжаючий тонік для обличчя, який підходить для всіх типів шкіри.',
    volume: '250 мл',  // Добавленное поле
    reviews: 25,  // Добавленное поле
    images: {
      main: 'assets/uploads/creatine/BiotechCreaZero320g.jpg',
      previews: [
        'assets/uploads/creatine/BiotechCreaZero320g.jpg',
        'assets/uploads/creatine/UniversalAnimalCreatine-500g.jpg',
      ],
    },
  };

  // Мок-данные для описания и характеристик
  const productInfo = {
    description: `Освіжаючий тонік для обличчя "Трояндова роса" створений на основі гідролату троянди, який відомий своїми заспокійливими та відновлюючими властивостями. Засіб підходить для всіх типів шкіри, включаючи чутливу, суху та схильну до подразнень.`,
    characteristics: [
      { name: 'Тип шкіри', value: 'чутлива' },
      { name: 'Призначення', value: 'очищення, тонізування' },
      { name: 'Інгредієнти', value: 'касторова олія, лимонна кислота' },
      { name: 'Час застосування', value: 'універсальний' },
      { name: 'Стать', value: 'унісекс' },
      { name: 'Зроблено в', value: 'Україна' },
      { name: 'Класифікація', value: 'натуральний засіб' },
    ],
  };

  // Мок-данные для отзывов
  const reviews = [
    {
      userInitial: 'Н',
      userName: 'Надiя',
      rating: 4,
      text: `Цей тонік став моїм маст-хевом у щоденному догляді! У мене чутлива шкіра, і більшість засобів викликають почервоніння або подразнення, але "Трояндова роса" просто ідеально підходить.`,
      date: '5 червня 2024',
    },
    {
      userInitial: 'М',
      userName: 'Марія',
      rating: 5,
      text: `Відчуття свіжості після використання – неймовірне, а шкіра стала м’якшою і виглядає здоровішою.`,
      date: '10 червня 2024',
    },
    {
      userInitial: 'А',
      userName: 'Анастасія',
      rating: 4,
      text: `Аромат троянди такий ніжний, що я насолоджуюся кожного разу, коли наношу його.`,
      date: '15 червня 2024',
    },
  ];

  const productGroups = 
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
    }

  return (
    <>
      <HeaderComponent/>  
      <ProductTopComponent 
        productName={product.name}
        productDescription={product.description}
        productVolume={product.volume}
        productPrice={product.price}
        productRating={product.rating}
        productReviews={product.reviews}
        productImages={product.images}
      />
      <ProductInfoComponent description={productInfo.description} characteristics={productInfo.characteristics} />

      <ProductReviewComponent reviews={reviews} />

      <ProductGroup productGroup={productGroups}/>
      <FooterComponent/>
    </>
  );
};

export default ProductDetailsPage;
