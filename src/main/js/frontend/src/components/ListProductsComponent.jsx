import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";
import {deleteProduct, getCount, listProducts} from "../services/ProductService.jsx";
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
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [count, setCount] = useState(0);

    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const navigator = useNavigate();

    useEffect(() => {
        countProducts();
        getAllProducts();
    }, [page, size]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart)
            setCart(JSON.parse(storedCart));
    }, []);

    function countProducts() {
        getCount()
            .then((response) => {
                setCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getAllProducts() {
        listProducts(page, size).then((response) => {
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

    const totalPages = Math.ceil(count / size);
    const hasNextPage = page < totalPages - 1;

    return (
        <div className="container">
            <br/>
            <h2 className="text-center heading">Products</h2>
            <div className="d-flex justify-content-end mb-3">
                <div className="btn-group">
                    <select className="form-select" value={sortBy || ""} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort by...</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
                {isAdmin() &&
                    <>
                        <button className="btn btn-primary mb-2 width110"
                                onClick={add}>Add
                        </button>
                    </>}
            </div>

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
                                        className="form-control me-2 width110"
                                    />
                                    <button
                                        className="btn btn-primary me-2 width110"
                                        onClick={() => addToCart(product.id, quantities[product.id] || 1)}>
                                        Add To Cart
                                    </button>
                                </div>
                                {isAdmin() && (
                                    <>
                                        <button
                                            className="btn btn-primary me-2 width110"
                                            onClick={() => update(product.id)}>Update
                                        </button>
                                        <button
                                            className="btn btn-danger me-2 width110"
                                            onClick={() => delete_(product.id)}>Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="offset-md-5 mb-3">
                    <button
                        className="btn btn-primary me-4 width110"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}>Previous
                    </button>
                    <span className="me-4" style={{color: "WHITE", fontSize: 20}}>{page + 1}</span>
                    <button
                        className="btn btn-primary width110"
                        onClick={() => setPage(page + 1)}
                        disabled={!hasNextPage}>Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListProductsComponent;