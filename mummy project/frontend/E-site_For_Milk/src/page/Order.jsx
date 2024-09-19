import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Order.css'; // Import CSS for styling

function Order() {
  const [orderData, setOrderData] = useState([]);

  const orderUrl = 'https://dairy-xesa.onrender.com/order';

  const authorization = localStorage.getItem('token');

  const getOrderData = async () => {
    try {
      const response = await axios.get(orderUrl, {
        headers: {
          authorization,
        },
      });
      setOrderData(response.data.orderList);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);


  const deleteUrlUrl = 'https://dairy-xesa.onrender.com/order';

  async function handleDelete(id) {
    const deleteorder = await axios.delete(`${deleteUrlUrl}/${id}`, {
      headers: {
        authorization
      }
    })
    // console.log(deleteorder.data);
    getOrderData()
    alert(`${deleteorder.data.Message}`)
  }

  //  handle order status
  async function handleOrderStatus(e, id) {
    // setOrderStatus(e)
    console.log(id);
    const payload = {
      status: e
    }
    const updateOrderStatus = await axios.patch(`${orderUrl}/${id}`, payload, {
      headers: {
        authorization
      }
    })
    getOrderData()
    // console.log(updateOrderStatus.data);

  }
  // console.log(orderStatus);
  {/* /  enum: ['pending', 'confirmed', 'delivered', 'canceled'], */ }
  function setBackgroundcolco(status) {
    switch (status) {
      case 'Pending':
        return '#f0ad4e'; // Orange
      case 'Confirmed':
        return '#5bc0de'; // Blue
      case 'Delivered':
        return '#5cb85c'; // Green
      case 'Canceled':
        return '#d9534f'; // Red
      default:
        return '#000'; // Default black
    }
  }


  return (
    <div className="order-container">
      <h1 className="order-header">Your Orders</h1>
      {orderData.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Creator Name</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <tr key={order._id}>
                <td>{index+1}</td>
                <td>
                  <img
                    src={order.productImage}
                    alt={order.productname}
                    className="order-image"
                  />
                </td>
                <td>{order.productname}</td>
                <td>{order.price}</td>
                <td>{order.creatorname}</td>
                <td>{order.phoneNumber}</td>
                <td>
                  {/* /  enum: ['pending', 'confirmed', 'delivered', 'canceled'], */}
                  <select
                    value={order.status}
                    onChange={(e) => { handleOrderStatus(e.target.value, order._id)}}
                    style={{ background: setBackgroundcolco(order.status), color:"white" , fontWeight:"bold" }}

                  >

                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  {/* {order.status} */}
                </td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td><button onClick={(e) => { handleDelete(order._id) }}>Delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading orders...</p>
      )}
    </div>
  );
}

export default Order;
