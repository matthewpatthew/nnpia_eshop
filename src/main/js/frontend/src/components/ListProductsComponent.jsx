import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";
import {deleteProduct, listProducts} from "../services/ProductService.jsx";
import Cookies from "js-cookie";


const ListProductsComponent = () => {

    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };

    const isUser = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_USER");
    };

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({})

    const navigator = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart)
            setCart(JSON.parse(storedCart));
    }, []);

    function getAllProducts() {
        listProducts().then((response) => {
            setProducts(response.data)
        }).catch(error => {
            console.log(error)
        });
    }

    function add() {
        navigator("/add-product");
    }

    function update(id) {

    }

    function delete_(id) {
        deleteProduct(id).then((result) => {
            getAllProducts()
        }).catch(error => {
            console.log(error)
        })
    }

    const addToCart = (productId, quantity) => {
        if (!isUser()) {
            navigator("/login");
            return;
        }

        const updatedCart = [...cart];
        let found = false;

        updatedCart.forEach((item) => {
            if (item.productId === productId) {
                item.quantity += quantity;
                found = true;
            }
        });

        if (!found) {
            updatedCart.push({productId: productId, quantity: quantity});
        }

        setCart(updatedCart);

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));

        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className="container">
            <br/>
            <h2 className="text-center heading">PRODUCTS</h2>
            {isAdmin() &&
                <>
                    <button className="btn btn-primary mb-2"
                            onClick={add}>Add
                    </button>
                </>}
            <br/>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className="card h-100">
                            <img src={`data:image/jpeg;base64,${product.image}`} className="card-img-top"
                                 alt={product.name} style={{width: "100%", height: "220px", objectFit: "cover"}}/>
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Price: {product.price}</strong></p>
                                <div className="d-flex align-items-center mb-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[product.id] || 1}
                                        onChange={(e) =>
                                            setQuantities({
                                                ...quantities, [product.id]: parseInt(e.target.value),
                                            })
                                        }
                                        className="form-control me-2"
                                        style={{maxWidth: "100px"}}
                                    />
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => addToCart(product.id, quantities[product.id] || 1)}>
                                        Add To Cart
                                    </button>
                                </div>
                                {isAdmin() && (
                                    <>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => update(product.id)}>Update
                                        </button>
                                        <button
                                            className="btn btn-danger me-2"
                                            onClick={() => delete_(product.id)}>Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProductsComponent;