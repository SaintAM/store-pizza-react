import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    //category state
    // const [categoryId, setCategoryId] = useState(0);
    const categoryId = useSelector((state) => state.filter.categoryId);

    //sort state
    // const [sortType, setSortType] = useState({
    //     name: "популярности",
    //     sortProperty: "rating",
    // });
    const sortType = useSelector((state) => state.filter.sort);

    useEffect(() => {
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";
        const sortBy = sortType.sortProperty.replace("-", "");

        setIsLoading(true);

        axios
            .get(
                `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
        // fetch(
        //     `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        // )
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setItems(data);
        //         setIsLoading(false);
        //     });
        window.onbeforeunload = () => window.scrollTo(0, 0);
    }, [sortType, categoryId, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    return (
        <>
            <div className="content__top">
                <Categories
                // value={categoryId}
                // onChangeCategory={(id) => setCategoryId(id)}
                />
                <Sort
                // value={sortType} onChangeSort={(id) => setSortType(id)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination setCurrentPage={setCurrentPage} />
        </>
    );
};

export default Home;
