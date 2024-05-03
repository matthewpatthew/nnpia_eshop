import React from 'react';
import {useNavigate} from "react-router-dom";

const PurchaseConfirmedComponent = () => {

    const navigator = useNavigate()

    return (
        <div className="order-confirmation text-white text-center py-5">
            <h2 className="mb-4">Order Created!</h2>
            <p className="lead mb-4">Thank you for your order. Payment details have been sent to your email.</p>
            <p className="lead mb-4">If you have any questions, feel free to contact us.</p>
            <p className="lead">Thank you for your trust.</p>
            <button
                className="btn btn-success"
                onClick={() => navigator("/products")}>Back to homepage
            </button>
        </div>
    );
}

export default PurchaseConfirmedComponent;