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
    const orderUrl = `https://dairy-xesa.onrender.com/order`;


    const productUrl = `https://dairy-xesa.onrender.com/product`;

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
            // alert("Please log in first.");
            toast({
                title: 'Please, Login first',
                description: "उत्पादन खरेदी करण्यासाठी तुम्हाला प्रथम लॉगिन करावे लागेल.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
            navigate('/login');
            return;
        }
        else {
            const fromData = {
                productImage: product.productImage,
                productname: product.productname,
                price: priceUni
            }
            try {
                const response = await axios.post(orderUrl, fromData, {
                    headers: {
                        authorization,
                    },
                });
                if (response.data.Message == `New order place successfuly`) {
                    onOpen();
                    const quantityPayload = {
                        quantityAvailable: product.quantityAvailable - Quantity1
                    }
                    const updateQuantity = await axios.patch(`${productUrl}/${product._id}`, quantityPayload, {
                        headers: {
                            authorization
                        }
                    })
                }

            } catch (error) {
                console.error('Error fetching products:', error);
                toast({
                    title: 'Error',
                    description: `${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
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
