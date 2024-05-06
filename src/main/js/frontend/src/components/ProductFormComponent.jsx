import React, {useEffect, useRef, useState} from "react";
import {createProduct, getProduct, updateProduct} from "../services/ProductService.jsx";
import {useParams} from "react-router-dom";

const ProductFormComponent = () => {
    const fileInputRef = useRef(null);
    const {id} = useParams();

    const [product, setProduct] = useState({
        name: "",
        image: null,
        price: "",
        description: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct({...product, image: file});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product);

        try {
            let base64Image = null;

            if (product.image instanceof File) {
                const reader = new FileReader();
                reader.readAsDataURL(product.image);
                base64Image = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result.split(",")[1]);
                    reader.onerror = error => reject(error);
                });
            } else {
                base64Image = product.image;
            }

            const productData = {
                name: product.name,
                image: base64Image,
                price: product.price,
                description: product.description
            };

            if (id) {
                await updateProduct(id, productData);
                alert("Product successfully updated !");
            } else {
                await createProduct(productData);
                alert("Product successfully added!");
            }

            setProduct({
                name: "",
                image: null,
                price: "",
                description: ""
            });
            fileInputRef.current.value = null;
        } catch (error) {
            console.error("Error encoding image:", error);
            alert("Error encoding image. Please try again later.");
        }
    };

    useEffect(() => {
        if (id) {
            getProduct(id).then((response) => {
                setProduct({
                    ...product,
                    name: response.data.name,
                    image: response.data.image,
                    price: response.data.price,
                    description: response.data.description
                });
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <div className="card-body">
                        <div>
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <button
                                className="btn btn-success" onClick={handleSubmit}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFormComponent;
