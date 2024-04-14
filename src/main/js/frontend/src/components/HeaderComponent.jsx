import React from "react";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
                    <a className='navbar-brand m-2' href="http://localhost:3000/products">Eshop</a>
                    <ul className="navbar-nav mr-auto"> {/* mr-auto pro větší mezeru mezi položkami */}
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/products">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/cart">Cart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-lg-auto me-3">
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/login">Login</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent;