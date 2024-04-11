import React from "react";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-primary'>
                    <a className='navbar-brand m-1' href="http://localhost:3000/api/v1/products"> Eshop</a>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent