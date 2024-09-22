import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../style/ProductList.css';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
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


function ProductList() {
    const [productData, setProductData] = useState([]);
    const productUrl = `https://dairy-xesa.onrender.com/product`;

    const [isEditing, setIsEditing] = useState(false); // To show/hide update form
    const [selectedProduct, setSelectedProduct] = useState(null); // To store the product being updated

    const [runDelete, setRunDelete] = useState(false)

    var [deleteProduct , setDeleteProduct] = useState()


    const orderUrl = `https://dairy-xesa.onrender.com/order`;



    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const { isOpen:deleteisOpen, onOpen:deleteOnOpen, onClose:deleteOnClose } = useDisclosure()



    const cancelRef = useRef()
    const cancelRef2 = useRef()

    const toast = useToast()

    const navigate = useNavigate()

    const authorization = localStorage.getItem('token');



    const state = useSelector(state => state)
    let name;
    let phoneNumber;
    let role;
    // console.log(state.isLoggedIn);
    if (state.user) {
        name = state.user.user.name
        phoneNumber = state.user.user.phoneNumber
        role = state.user.user.role
    }
    // console.log(role);



    const getProductData = async () => {
        try {
            const response = await axios.get(productUrl, {
                headers: {
                    authorization,
                },
            });
            setProductData(response.data.allproduct);

            // console.log(response.data.allproduct);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);
    //   console.log(productData);


    async function handlebuy(product) {
        // console.log(product);

        if (!state.isLoggedIn) {
            // alert("Please log in first.");
            toast({
                title: 'Please, Login first',
                description: "You have to login first for buy product",
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
                price: product.price
            }
            try {
                const response = await axios.post(orderUrl, fromData, {
                    headers: {
                        authorization,
                    },
                });
                // console.log(response.data.Message);
                if (response.data.Message == `New order place successfuly`) {
                    onOpen();
                    const quantityPayload = {
                        quantityAvailable: product.quantityAvailable - 250
                    }
                    const updateQuantity = await axios.patch(`${productUrl}/${product._id}`, quantityPayload, {
                        headers: {
                            authorization
                        }
                    })
                    // console.log(updateQuantity.data.Message);
                    if (updateQuantity.data.Message == "Product update successfully") {
                        getProductData();
                    }

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

    function handleDeleteModel(id){
        setDeleteProduct(id)
        deleteOnOpen();
    }
// console.log(deleteProduct);


    async function handleDelete(id) {

        try {
                const deleteProduct = await axios.delete(`${productUrl}/${id}`, {
                    headers: {
                        authorization,
                    },
                });
                // console.log(deleteProduct.data.Message);
                if (deleteProduct.data.Message == "Product delete successfully") {
                    getProductData();
                    toast({
                        title: `${deleteProduct.data.Message}`,
                        description: `${deleteProduct.data.Message}`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                    })
                    // setRunDelete(false)
                    deleteOnClose();

                }
                else {
                    toast({
                        title: `${deleteProduct.data.Message}`,
                        description: `${deleteProduct.data.Message}`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                    })
                }
            } catch (error) {
                // console.log(error.message);
                toast({
                    title: `${error.message}`,
                    description: `${error.message}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                })
            }
      

    }





    function handleUpdate(product) {
        setSelectedProduct(product);  // Set the selected product for update
        setIsEditing(true);           // Show the update form
    }

    async function handleUpdateSubmit(e, id) {
        e.preventDefault();

        const updatedProduct = {
            productname: e.target.productname.value,
            price: e.target.price.value,
            quantityAvailable: e.target.quantityAvailable.value
        };

        try {
            const response = await axios.patch(`${productUrl}/${id}`, updatedProduct, {
                headers: {
                    authorization
                }
            });
      
            
            if (response.data.Message === "Product update successfully") {
                getProductData();      // Refresh the product list
                setIsEditing(false);   // Close the form
                toast({
                    title: "Product updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast({
                title: "Error updating product.",
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        }
    }



// console.log(runDelete);


    return (
        <div className="product-container">
            <h1 className="product-header">आमची सर्वोत्तम डेअरी उत्पादने </h1>
            <div className="product-list">
                {productData && productData.length > 0 ? (
                    productData.map((product) => (
                        <div key={product._id} className="product-card">

                            <img
                                src={product.productImage}
                                alt={product.productname}
                                className="product-image"
                            />
                            <h2 className="product-name">{product.productname}</h2>
                            <p className="product-price">Rs.{product.price}</p>
                            {role == 'admin' && <p className="product-quantity">Available Quantity: {product.quantityAvailable} {product.productname == "दही" ? (`gram`) : (`ml`)}</p>}
                            {(product.quantityAvailable > 0) ? (
                                <button onClick={() => { handlebuy(product) }} className="buy-now-btn">आता खरेदी करा</button>
                            ) : (
                                <Button colorScheme='red'>Product Out of Stock</Button>
                            )}
                            {role == 'admin' && <Button colorScheme='blue' m={1} onClick={() => { handleUpdate(product) }}>Update</Button>}
                            {role == 'admin' && <Button colorScheme='red' onClick={() => { handleDeleteModel(product._id) }}>Delete</Button>}
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>

            {isEditing && selectedProduct && (
                <div className="update-form">
                    <h3>Update Product: {selectedProduct.productname}</h3>
                    <form onSubmit={(e) => handleUpdateSubmit(e, selectedProduct._id)}>
                        <input
                            type="text"
                            defaultValue={selectedProduct.productname}
                            name="productname"
                            placeholder="Product Name"
                        />
                        <input
                            type="string"
                            defaultValue={selectedProduct.price}
                            name="price"
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            defaultValue={selectedProduct.quantityAvailable}
                            name="quantityAvailable"
                            placeholder="Quantity Available"
                        />
                        <Button colorScheme='blue' type="submit">Submit Update</Button>
                        <Button colorScheme='red' onClick={() => setIsEditing(false)}>Cancel</Button>
                    </form>
                </div>
            )}


            {/* chakra ui  */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Order Placed Successfully</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody color='tomato' >
                            {name}, Your order has been placed successfully! We will contact you shortly at {phoneNumber}.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme='blue' ref={cancelRef} onClick={onClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>




            {/* chakra ui for delete product */}
            <AlertDialog
                isOpen={deleteisOpen}
                leastDestructiveRef={cancelRef2}
                onClose={deleteOnClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure delete product?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef2} onClick={deleteOnClose}>
                                Cancel
                            </Button>
                            <Button  colorScheme='red' onClick={()=>{handleDelete(deleteProduct)}} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>



        </div>
    );
}

export default ProductList;
