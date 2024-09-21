import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Order.css'; // Import CSS for styling
import { Button, Spinner, useToast } from '@chakra-ui/react';

function Order() {
  const [orderData, setOrderData] = useState([]);

  const [refresh, setRefresh] = useState(false)

  const [loading, setLoading] = useState({});

  const toast  = useToast()

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
      setRefresh(false)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);


  const deleteUrlUrl = 'https://dairy-xesa.onrender.com/order';

  async function handleDelete(id) {
    setLoading(pre => ({ ...pre, [id]: true }))
    const deleteorder = await axios.delete(`${deleteUrlUrl}/${id}`, {
      headers: {
        authorization
      }
    })
    // console.log(deleteorder.data);
    setLoading(pre => ({ ...pre, [id]: false }))
    getOrderData()
    // alert(`${deleteorder.data.Message}`)
    toast({
      title:`${deleteorder.data.Message}`, 
      description:`${deleteorder.data.Message}`, 
      status:"success", 
      duration:5000, 
      isClosable:true, 
      position:`top-right`
    })
  }

  //  handle order status
  const orderUrlpatch = `https://dairy-xesa.onrender.com/order/patch`
  async function handleOrderStatus(e, orderId) {
    const newStatus = e;
    const payload = {
      status: newStatus,
    };

    const response = await axios.patch(`${orderUrlpatch}/${orderId}`, payload, {
      headers: {
        authorization,
      },
    })
    console.log(response.data);
    getOrderData();
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

  function handlerefresh() {
    console.log("sdgdsgd");

    setRefresh(true)
    getOrderData();

  }
  // console.log(refresh);



  return (
    <div className="order-container">
      <h1 className="order-header"> Your Orders
      </h1>
      <Button colorScheme='blue' onClick={handlerefresh}>{refresh ? (
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='md'
      />) : ("RefreshData")}</Button>
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
                <td>{index + 1}</td>
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
                    onChange={(e) => { handleOrderStatus(e.target.value, order._id) }}
                    style={{ background: setBackgroundcolco(order.status), color: "white", fontWeight: "bold" }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  {/* {order.status} */}
                </td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                {/* <td><Button colorScheme='red' onClick={(e) => { handleDelete(order._id) }}>Delete</Button></td> */}
                <td>
                  <Button colorScheme='red' className="btn" onClick={(e) => { handleDelete(order._id) }} >
                    {loading[order._id] ? (<Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='md'
                    />) : (
                      "Delete")
                    }
                  </Button>
                </td>

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
