import React from 'react';
import '../style/Homepage.css'; // Import the CSS file for styles
import ProductList from '../component/ProductList';

function Homepage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">ऑनलाइन डेअरीमध्ये आपले स्वागत आहे</h1>
      <p className="homepage-info">
      हे एक डेअरी वेबसाइट आहे जिथे तुम्हाला सर्वोत्तम डेअरी उत्पादने मिळतील. ताजे दूध, दही आणि ताक मिळेल. </p>

        <ProductList/>
    </div>
  );
}

export default Homepage;
