import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/ProductList.css';
import { useSelector } from 'react-redux';

function ProductList() {
    const [productData, setProductData] = useState([]);
    const productUrl = `https://dairy-xesa.onrender.com/product`;
    const orderUrl = `https://dairy-xesa.onrender.com/order`;

    const authorization = localStorage.getItem('token');

    const state = useSelector(state => state)
    let name;
    let phoneNumber;
    console.log(state.user);
    if(state.user){
        name = state.user.user.name
        phoneNumber = state.user.user.phoneNumber
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(productUrl, {
                headers: {
                    authorization,
                },
            });
            setProductData(response.data.allproduct);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);


  async  function handlebuy(product) {
      const fromData = {
            productImage:product.productImage,
            productname:product.productname,
            price:product.price
        }
        // console.log(fromData);
        try {
            const response = await axios.post(orderUrl, fromData, {
                headers: {
                    authorization,
                },
            });
            // console.log(response.data.Message);
            if(response.data.Message == `New order place successfuly`){
                alert(`${name}, Your order place successfully. shortly we connect you with give MobileNumber ${phoneNumber} `)
            }
            else{
                alert(`Something went wrong please contact 9657568826`)
            }

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    return (
        <div className="product-container">
            <h1 className="product-header">आमची सर्वोत्तम डेअरी उत्पादने </h1>
            <div className="product-list">
                {productData.length > 0 ? (
                    productData.map((product) => (
                        <div key={product._id} className="product-card">
                            <img
                                src={product.productImage}
                                alt={product.productname}
                                className="product-image"
                            />
                            <h2 className="product-name">{product.productname}</h2>
                            <p className="product-price">Rs.{product.price}</p>
                            <button onClick={() => { handlebuy(product) }} className="buy-now-btn">आता खरेदी करा</button>
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;
