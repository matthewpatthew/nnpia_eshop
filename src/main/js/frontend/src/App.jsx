import React, {useEffect, useState} from 'react';
import './App.css';
import HeaderComponent from "./components/HeaderComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppUserFormComponent from "./components/AppUserFormComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import ListAppUsersComponent from "./components/ListAppUsersComponent.jsx";
import ListProductsComponent from "./components/ListProductsComponent.jsx";
import AddProductForm from "./components/AddProductForm.jsx";

const App = () => {

    return (
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                <Route path='/appusers' element={<ListAppUsersComponent/>}/>
                <Route path='/add-appuser' element={<AppUserFormComponent/>}/>
                <Route path='/products' element={<ListProductsComponent/>}/>
                <Route path='/login' element={<LoginComponent/>}/>
                <Route path='add-product' element={<AddProductForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
