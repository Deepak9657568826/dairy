import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddProduct.css'; // Assuming you will create a separate CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Spinner, useToast } from '@chakra-ui/react';

function AddProduct() {
    const [productImage, setProductImage] = useState('');
    const [productname, setProductname] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityAvailable, setQuantityAvailable] = useState('');
    const [state, setstate] = useState('');
    const [discription, setdiscription] = useState('');

    const [spinner, setSpinner] = useState(false)

    const toast = useToast()

    const navigate = useNavigate()

    const authorization = localStorage.getItem("token")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true)

        const newProduct = {
            productImage,
            productname,
            discription,
            price,
            quantity, 
            state,
            quantityAvailable
        };
        console.log(newProduct);
        

        try {
            const response = await axios.post('https://dairy-xesa.onrender.com/product', newProduct, {
                headers: {
                    authorization
                }
            });
            if (response.data.Message == "New product added successfully") {
                // alert("Product added successfully!");
                setSpinner(false)
                toast({
                    title: `${response.data.Message}`,
                    description: `${response.data.Message}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                })
                navigate('/')
                // Reset form after submission
                setProductImage('');
                setProductname('');
                setPrice('');
                setQuantityAvailable('');

            } else {
                // alert("Failed to add product, please try again.");
                setSpinner(false)
                toast({
                    title: "Failed to add product, please try again.",
                    description: "Failed to add product, please try again.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                })
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setSpinner(false)
            toast({
                title: `${error.message}`,
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
        }
    };

    return (
        <div className='add-product-main'>
        <div className="form-container">
            <h2 className="form-title">Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>Product Image URL:</label>
                    <input
                        type="text"
                        value={productImage}
                        onChange={(e) => setProductImage(e.target.value)}
                        placeholder="Enter product image URL"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product discription:</label>
                    <input
                        type="text"
                        value={discription}
                        onChange={(e) => setdiscription(e.target.value)}
                        placeholder="Enter discription"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>State:</label>
                    <select name="" id="" onChange={(e)=>{setstate(e.target.value)}}>
                    <option value="liquide">liquide</option>
                    <option value="solid">solid</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Quantity Available:</label>
                    <input
                        type="number"
                        value={quantityAvailable}
                        onChange={(e) => setQuantityAvailable(e.target.value)}
                        placeholder="Enter quantity available"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">{spinner ? (<Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='md'
                />) : (
                    "Add Product"
                )}
                </button>
            </form>
        </div>
        </div>
    );
}

export default AddProduct;
