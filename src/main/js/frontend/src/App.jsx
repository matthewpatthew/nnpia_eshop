import React from "react";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppUserFormComponent from "./components/AppUserFormComponent.jsx";
import LoginFormComponent from "./components/LoginFormComponent.jsx";
import ListAppUsersComponent from "./components/ListAppUsersComponent.jsx";
import ListProductsComponent from "./components/ListProductsComponent.jsx";
import ProductFormComponent from "./components/ProductFormComponent.jsx";
import CartComponent from "./components/CartComponent.jsx";
import PurchaseComponent from "./components/PurchaseComponent.jsx";

const App = () => {

    return (
        <div className="app-container structure">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path="/login" element={<LoginFormComponent/>}/>
                    <Route path="/cart" element={<CartComponent/>}/>
                    <Route path="/order" element={<PurchaseComponent/>}/>
                    <Route path="/register" element={<AppUserFormComponent/>}/>
                    <Route path="/products" element={<ListProductsComponent/>}/>
                    <Route path="add-product" element={<ProductFormComponent/>}/>
                    <Route path="edit-product" element={<ProductFormComponent/>}/>
                    <Route path="delete-product" element={<ProductFormComponent/>}/>
                    <Route path="/appusers" element={<ListAppUsersComponent/>}/>
                    <Route path="/add-appuser" element={<AppUserFormComponent/>}/>
                    <Route path="/edit-appuser/:id" element={<AppUserFormComponent/>}/>
                    <Route path="/delete-appuser/:id" element={<AppUserFormComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
