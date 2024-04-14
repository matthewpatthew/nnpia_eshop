import React, { useState } from 'react';
import { createProduct } from '../services/ProductService.jsx';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        price: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append('name', formData.name);
            productData.append('image', formData.image);
            productData.append('price', formData.price);
            productData.append('description', formData.description);

            try {
                await createProduct(productData);
                alert('Product successfully added!');
                setFormData({
                    name: '',
                    image: null,
                    price: '',
                    description: ''
                });
            } catch (error) {
                console.error('Error adding product:', error);
                alert('Error adding product. Please try again later.');
            }
        } catch (error) {
            console.error('Error preparing product data:', error);
            alert('Error preparing product data. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
