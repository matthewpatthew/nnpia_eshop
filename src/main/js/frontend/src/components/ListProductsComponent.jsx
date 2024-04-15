import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {listProducts} from "../services/ProductService.jsx";
import img1 from '../assets/trash1.jpeg'
import img2 from '../assets/trash2.jpeg'


const ListProductsComponent= () => {

    //const [products, setProducts] = useState([])

    const navigator = useNavigate()

    const [products] = useState([
        {
            "id": 1,
            "name": "Smartphone XYZ",
            "image": img1,
            "price": "$499",
            "description": "Nový smartphone s vynikajícím fotoaparátem a výkonným procesorem."
        },
        {
            "id": 2,
            "name": "Notebook ABC",
            "image": img1,
            "price": "$899",
            "description": "Elegantní notebook s dlouhou výdrží baterie a vysokým výkonem."
        },
        {
            "id": 3,
            "name": "Sluchátka DEF",
            "image": img2,
            "price": "$199",
            "description": "Bezdrátová sluchátka s vynikajícím zvukem a pohodlným nošením."
        },
        {
            "id": 4,
            "name": "Sluchátka DEF",
            "image": img1,
            "price": "$199",
            "description": "Bezdrátová sluchátka s vynikajícím zvukem a pohodlným nošením."
        },
        {
            "id": 5,
            "name": "Sluchátka DEF",
            "image": img1,
            "price": "$199",
            "description": "Bezdrátová sluchátka s vynikajícím zvukem a pohodlným nošením."
        }
    ]);



    function addProduct() {
        navigator('/add-product')
    }

    function deleteProduct() {

    }

    function updateProduct() {

    }

    return (
        <div className='container'>
            <h2 className='text-center'>Our Products</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className="card h-100">
                            <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Price: {product.price}</strong></p>
                                <button className="btn btn-primary me-2" onClick={() => buy(product.id)}>Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProductsComponent;