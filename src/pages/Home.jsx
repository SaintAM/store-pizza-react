import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios, { Axios } from "axios";
import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [currentPage, setCurrentPage] = useState(1);
    // useContext
    const { searchValue } = useContext(SearchContext);
    //redux
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort);
    const currentPage = useSelector((state) => state.filter.currentPage);
    //useEffect
    useEffect(() => {
        const sortBy = sortType.sortProperty.replace("-", "");
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";

        setIsLoading(true);
        // Get
        axios
            .get(
                `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });
        // window.onbeforeunload = () => window.scrollTo(0, 0);
    }, [sortType.sortProperty, categoryId, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination value={currentPage} />
        </>
    );
};

export default Home;
