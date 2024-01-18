import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
import MainLayouts from "./layouts/MainLayouts";
// import NotFound from "./pages/NotFound";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
const Cart = React.lazy(
    () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const FullPizza = React.lazy(
    () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const NotFound = React.lazy(
    () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayouts />}>
                    <Route path="" element={<Home />} />
                    <Route
                        path="pizza/:id"
                        element={
                            <React.Suspense
                                fallback={<div>Идет загрузка...</div>}
                            >
                                <FullPizza />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="cart"
                        element={
                            <React.Suspense
                                fallback={<div>Идет загрузка...</div>}
                            >
                                <Cart />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <React.Suspense
                                fallback={<div>Идет загрузка...</div>}
                            >
                                <NotFound />
                            </React.Suspense>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
