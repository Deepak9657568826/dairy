import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../style/ParticularOrder.css';  // Assuming you will write CSS here

function ParticularOrder() {
  const [data, setData] = useState([]);

  const particularuserOrder = `https://dairy-xesa.onrender.com/order/particular`;
  const authorization = localStorage.getItem('token');

  async function getOrderList() {
    try {
      const response = await axios.get(particularuserOrder, {
        headers: {
          authorization,
        },
      });
      console.log(response.data);
      setData(response.data.orderList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="order-container">
      <h2 className="order-title">Your Orders</h2>
      {data.length > 0 ? (
        data.map((order, index) => (
          <div className="order-card" key={index}>
            <img className="order-image" src={order.productImage} alt={order.productname} />
            <div className="order-details">
              <h3 className="product-name">{order.productname}</h3>
              <p className="order-creator"><strong>Ordered by:</strong> {order.creatorname}</p>
              <p className="order-price"><strong>Price:</strong> {order.price}</p>
              <p className="order-status"><strong>Status:</strong> {order.status}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-orders">You have no orders.</p>
      )}
    </div>
  );
}

export default ParticularOrder;
