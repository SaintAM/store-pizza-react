import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //category state
    const [categoryId, setCategoryId] = useState(0);
    //sort state
    const [sortType, setSortType] = useState({
        name: "популярности",
        sortProperty: "rating",
    });

    useEffect(() => {
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
        setIsLoading(true);

        fetch(
            `https://64861b03a795d24810b7b7ef.mockapi.io/items?${
                categoryId > 0 ? `category=${categoryId}` : ""
            }&sortBy=${sortType.sortProperty.replace("-", "")}&order=${order}`
        )
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            });
    }, [sortType, categoryId]);
    window.onbeforeunload = () => window.scrollTo(0, 0);

    return (
        <>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={(id) => setCategoryId(id)}
                />
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                    : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
        </>
    );
};

export default Home;
