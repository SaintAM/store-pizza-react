import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import Sort from "./components/Sort";
import Header from "./components/Header";
import Categories from "./components/Categories";
import PizzaBlock from "./components/PizzaBlock";
import pizzasJson from "./assets/pizzas.json";
import Skeleton from "./components/PizzaBlock/Skeleton";

function App() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://64861b03a795d24810b7b7ef.mockapi.io/items")
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="content">
                    <div className="container">
                        <div className="content__top">
                            <Categories />
                            <Sort />
                        </div>
                        <h2 className="content__title">Все пиццы</h2>
                        <div className="content__items">
                            {isLoading
                                ? [...new Array(6)].map((_, i) => (
                                      <Skeleton key={i} />
                                  ))
                                : items.map((obj) => (
                                      <PizzaBlock key={obj.id} {...obj} />
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
