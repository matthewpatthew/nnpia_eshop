import React, {useRef, useState} from "react";
import {createProduct} from "../services/ProductService.jsx";

const ProductFormComponent = () => {
    const fileInputRef = useRef(null);

    const [processingImage, setProcessingImage] = useState(false);

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

        if (!product.image || processingImage) {
            return;
        }
        setProcessingImage(true);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(product.image);
            reader.onload = async () => {
                const base64Image = reader.result.split(",")[1];

                const productData = {
                    name: product.name,
                    image: base64Image,
                    price: product.price,
                    description: product.description
                };

                await createProduct(productData);
                alert("Product successfully added!");
                setProduct({
                    name: "",
                    image: null,
                    price: "",
                    description: ""
                });
                fileInputRef.current.value = null;
            };
        } catch (error) {
            console.error("Error encoding image:", error);
            alert("Error encoding image. Please try again later.");
        } finally {
            setProcessingImage(false);
        }
    };

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
