import React, {useState} from 'react'
import './App.css'
import ListAppUsersComponent from "./components/ListAppUsersComponent.jsx"
import HeaderComponent from "./components/HeaderComponent.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AppUserComponent from "./components/AppUserComponent.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    {/*//http://localhost:3000*/}
                    <Route path='/' element={<ListAppUsersComponent/>}></Route>
                    {/*//http://localhost:3000/add-appuser*/}
                    <Route path='/add-appuser' element={<AppUserComponent/>}></Route>
                </Routes>

            </BrowserRouter>
        </>
    )
}

export default App
