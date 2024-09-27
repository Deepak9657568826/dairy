import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Order.css'; // Import CSS for styling
import {
  Button, Spinner, useToast, Skeleton, SkeletonCircle, SkeletonText,
  Stack,
  Box
} from '@chakra-ui/react';


function Order() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState({});

  const [pending, setPending] = useState(0)
  const [confirm, setconfirm] = useState(0)
  const [delivered, setdelivered] = useState(0)
  const [cancled, setcancled] = useState(0)


  const toast = useToast()
  const orderUrl = 'https://dairy-xesa.onrender.com/order';

  const authorization = localStorage.getItem('token');

  const deleteUrlUrl = 'https://dairy-xesa.onrender.com/order';

  // filter data
  const [filterdata, setFilterData] = useState([]);
  const [length, setLength] = useState(0)

  async function handleDelete(id) {
    setLoading(pre => ({ ...pre, [id]: true }))
    const deleteorder = await axios.delete(`${deleteUrlUrl}/${id}`, {
      headers: {
        authorization
      }
    })
    setLoading(pre => ({ ...pre, [id]: false }))
    getOrderData()
    toast({
      title: `${deleteorder.data.Message}`,
      description: `${deleteorder.data.Message}`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: `top-right`
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
    getOrderData();
  }

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

  // const [pending , setPending] = useState(0)
  // const [confirm , setconfirm] = useState(0)
  // const [delivered, setdelivered] = useState(0)
  // const [cancled , setcancled] = useState(0)


  const getOrderData = async () => {
    try {
      const response = await axios.get(orderUrl, {
        headers: {
          authorization,
        },
      });
      let order = response.data.orderList
      setOrderData(order);
      setFilterData(order)

      const pendingLength = order.filter((temp) => {
        return temp.status == "Pending"
      })
      setPending(pendingLength.length)

      const confirmedLength = order.filter((temp) => {
        return temp.status == "Confirmed"
      })
      setconfirm(confirmedLength.length)

      const deliveredLength = order.filter((temp) => {
        return temp.status == "Delivered"
      })
      setdelivered(deliveredLength.length)

      const cancledLength = order.filter((temp) => {
        return temp.status == "Canceled"
      })
      setcancled(cancledLength.length)





    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  function handleAll() {
    getOrderData();

  }

  function handleFilter(e) {
    const action = e.split(" ")[0];
    const Filter = orderData.filter((temp) => {
      return temp.status == action
    })
    setFilterData(Filter)
    setLength(Filter.length)

  }




  return (
    <div className="order-container">
      <h1 className="order-header">Your Orders</h1>

      <div className='button-orders'>
        <Button onClick={handleAll} >All orders</Button>
        <Button onClick={(e) => { handleFilter(e.target.innerHTML) }} colorScheme='yellow'>Pending ({`${pending}`})</Button>
        <Button onClick={(e) => { handleFilter(e.target.innerHTML) }} colorScheme='green'>Confirmed ({`${confirm}`})</Button>
        <Button onClick={(e) => { handleFilter(e.target.innerHTML) }} colorScheme='blue'>Delivered ({`${delivered}`})</Button>
        <Button onClick={(e) => { handleFilter(e.target.innerHTML) }} colorScheme='red'>Canceled ({`${cancled}`})</Button>
      </div>
      {orderData && orderData.length > 0 ? (
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
              <th>Order Date And time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterdata && filterdata.map((order, index) => (
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

                <td>{new Date(order.createdAt).toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true // For AM/PM format
                })}</td>
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
        <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
      )}
    </div>
  );
}

export default Order;
