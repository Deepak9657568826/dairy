import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../style/ParticularOrder.css';  // Assuming you will write CSS here
import { Button, Spinner } from '@chakra-ui/react';

function ParticularOrder() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const particularuserOrder = `https://dairy-xesa.onrender.com/order/particular`;
  const authorization = localStorage.getItem('token');

  async function getOrderList() {
    try {
      const response = await axios.get(particularuserOrder, {
        headers: {
          authorization,
        },
      });
      setData(response.data.orderList);
      setRefresh(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderList();
  }, []);

  function handlerefresh() {
    setRefresh(true)
    getOrderList();
  }

  return (
    <div className="order-container">
      <h2 className="order-title">तुमचे पूर्वीचे ऑर्डर</h2>
      <Button colorScheme='blue' onClick={handlerefresh}>{refresh ? (
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='md'
      />) : ("RefreshData")}</Button>
      {data.length > 0 ? (
        data.map((order, index) => (
          <div className="order-card" key={index}>
            <img className="order-image" src={order.productImage} alt={order.productname} />
            <div className="order-details">
              <h3 className="product-name">{order.productname}</h3>
              <p className="order-creator"><strong>ऑर्डर करणारी व्यक्ती :</strong> {order.creatorname}</p>
              <p className="order-price"><strong>किंमत:</strong> {order.price}</p>
              <p className="order-status"><strong>स्थिती:</strong> {order.status}</p>
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
