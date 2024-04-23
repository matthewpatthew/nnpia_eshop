import React, { useState, useEffect } from "react";
import { getProduct } from "../services/ProductService.jsx";
import "../css/styles.css"

const CartComponent = () => {
    const [cart, setCart] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        const loadCartProducts = async () => {
            const products = [];
            let totalPrice = 0;
            for (const item of cart) {
                try {
                    const response = await getProduct(item.productId);
                    const product = response.data;
                    const price = product.price * item.quantity;
                    products.push({ ...product, quantity: item.quantity, totalPrice: price });
                    totalPrice += price;
                } catch (error) {
                    console.log(`Error loading product with ID ${item.productId}: ${error}`);
                }
            }
            setCartProducts(products);
            setTotalPrice(totalPrice);
        };

        loadCartProducts();
    }, [cart]);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className="container">
            <br/>
            <h2 className="text-center heading">SHOPPING CART</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {cartProducts.map((product, index) => (
                    <tr key={`${product.id}-${index}`}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price}</td>
                        <td>${product.totalPrice}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => removeFromCart(product.id)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="text-end">
                <h5 className="other-text">Total Price: ${totalPrice}</h5>
            </div>
        </div>
    );
};

export default CartComponent;
