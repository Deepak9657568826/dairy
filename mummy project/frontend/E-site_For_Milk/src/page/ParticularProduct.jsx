import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/ParticularProduct.css';
import { useSelector } from 'react-redux';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

import axios from 'axios';

function ParticularProduct() {
           const apiUrl = import.meta.env.VITE_BASE_URL;

    const orderUrl = `${apiUrl}/order`;


    const productUrl = `${apiUrl}/product`;

    const [product, setProduct] = useState({});

    const authorization = localStorage.getItem('token');

    const [productQuantity, setProductQuantiyt] = useState(1)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const cancelRef = useRef()

    const toast = useToast()

    const navigate = useNavigate()



    const state = useSelector(state => state)
    let name;
    let phoneNumber;
    let role;
    if (state.user) {
        name = state.user.user.name
        phoneNumber = state.user.user.phoneNumber
        role = state.user.user.role
    }
    // Get the product ID from the URL
    const { id } = useParams();

    function fetchParticularProduct() {
        let fetchUrl = `${productUrl}/${id}`;
        fetch(fetchUrl, {
            headers: {
                Authorization: authorization
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.Singleproduct);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    useEffect(() => {
        fetchParticularProduct();
    }, [id, productQuantity]);


    const priceUni = product.price * Number(productQuantity);


    const Quantity1 = product.quantity * Number(productQuantity)



    function increment() {

        if (Quantity1 < product.quantityAvailable) {

            setProductQuantiyt(pre => pre + 1)
        }
    }

    function decrement() {
        if (priceUni > product.price) {
            setProductQuantiyt(pre => pre - 1)
        }
    }

 async function handlebuy(product) {

  if (!state.isLoggedIn) {
    toast({
      title: 'Please, Login first',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    navigate('/login');
    return;
  }

  const orderData = {
    productImage: product.productImage,
    productname: product.productname,
    price: priceUni
  };

  // 1️⃣ Create Razorpay order
  const { data } = await axios.post(`${apiUrl}/payment/create-order`, {
    amount: priceUni
  });

  // 2️⃣ Open Razorpay
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: data.amount,
    currency: data.currency,
    name: "Sealing Dairy",
    description: product.productname,
    order_id: data.id,

    handler: async function (response) {

      // 3️⃣ Verify payment
      const verifyRes = await axios.post(`${apiUrl}/payment/verify`, {
        ...response,
        orderData
      });

      if (verifyRes.data.success) {

        onOpen();

        const quantityPayload = {
          quantityAvailable: product.quantityAvailable - Quantity1
        };

        await axios.patch(`${productUrl}/${product._id}`, quantityPayload, {
          headers: { authorization }
        });
      }
    },

    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}


    function handleClose() {
        onClose()
        navigate("/")
    }

    return (
        <div className="product-detail-wrapper">
            {/* Product Card */}
            <div className="product-detail-card-par">
                <div className="product-detail-card-inner-image">
                    <img
                        src={product.productImage}
                        alt={product.productname}
                        className="product-detail-image-par"
                    />
                </div>
                <div className="product-detail-content">
                    <h2 className="product-detail-title">{product.productname}</h2>
                    <p className="product-detail-info">
                        {product.discription}
                    </p>
                    <div className='product-detail-image-button'>
                        <Button onClick={decrement}>-</Button>
                        <span>{productQuantity}</span>
                        <Button onClick={increment}>+</Button>
                    </div>
                </div>
            </div>
         

            {/* Price Details */}
            <div className='pricedetails'>
                <div className="product-detail-content">
                    <h2 className="product-detail-title">किंमत तपशील</h2>
                    <p className="product-detail-info">
                        <strong>किंमत:</strong> ₹{product.price * Number(productQuantity)}
                    </p>
                    <p className="product-detail-info">
                        <strong>प्रमाण:</strong> {product.quantity * Number(productQuantity)}  {(product.state == "solid")? ("gram"):("ml")}
                    </p>
                    <p className="product-detail-info">
                        <strong>एकूण किंमत:</strong> ₹{product.price * Number(productQuantity)}
                    </p>
                    <Button colorScheme='blue' onClick={() => handlebuy(product)} className="buy-btn">
                    खरेदी पुष्टी करा
                    </Button>
                </div>
            </div>

            {/* Purchase Success Modal */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>ऑर्डर यशस्वीरीत्या दिली गेली</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody color='tomato'>
                            {name}, तुमची ऑर्डर यशस्वीरीत्या दिली गेली आहे! आम्ही लवकरच तुम्हाला {phoneNumber} वर संपर्क करू.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme='blue' ref={cancelRef} onClick={handleClose}>
                            ठीक आहे
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );

}

export default ParticularProduct;
