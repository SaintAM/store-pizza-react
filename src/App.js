import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayouts from "./layouts/MainLayouts";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayouts />}>
                    <Route path="" element={<Home />} />
                    <Route path="pizza/:id" element={<FullPizza />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
