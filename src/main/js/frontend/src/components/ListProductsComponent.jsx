import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {listProducts} from "../services/ProductService.jsx";
import Cookies from "js-cookie";


const ListProductsComponent = () => {

    let isAdmin = false;
    const roles = Cookies.get('userRoles')
    if (roles != null && roles.includes('ROLE_ADMIN')) {
        isAdmin = true;
    }
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        listProducts().then((response) => {
            setProducts(response.data)
        });
    }, []);

    const navigator = useNavigate();

    function add() {
        navigator('/add-product');
    }

    function update() {

    }

    function delete_() {

    }

    function addToCart(id) {

    }


    return (
        <div className='container'>
            <br/>
            <h2 className='text-center'>PRODUCTS</h2>
            <br/>
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className='card h-100'>
                            <img src={`data:image/jpeg;base64,${product.image}`} className='card-img-top'
                                 alt={product.name} style={{width: '100%', height: '220px', objectFit: 'cover'}}/>
                            <div className="card-body">
                                <h5 className='card-title'>{product.name}</h5>
                                <p className='card-text'>{product.description}</p>
                                <p className='card-text'><strong>Price: {product.price}</strong></p>
                                <button
                                    className='btn btn-primary me-2'
                                    onClick={() => addToCart(product.id)}>Add To Cart
                                </button>
                                {isAdmin && (
                                    <>
                                        <button
                                            className='btn btn-primary me-2'
                                            onClick={() => update(product.id)}>Update
                                        </button>
                                        <button
                                            className='btn btn-danger me-2'
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
