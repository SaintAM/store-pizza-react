import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SearchContext } from "../App";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/pizzaSlice";

const Home = () => {
    // const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const navigate = useNavigate();

    const { searchValue } = useContext(SearchContext);
    //redux
    const dispatch = useDispatch();
    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    );
    const items = useSelector((state) => state.pizza.items);
        console.log(items);
    const fetchPizzas = async () => {
        const sortBy = sort.sortProperty.replace("-", "");
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";

        setIsLoading(true);
        // Get
        try {
            const res = await axios.get(
                `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            );
            dispatch(setItems(res.data));
        } catch (error) {
            console.log("ERROR:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.onbeforeunload = () => window.scrollTo(0, 0);
        // Если был первый рендер(isSearch) отправляем запрос за данными
        if (!isSearch.current) fetchPizzas();
        // в другом useEffect isSearch - станет true и этот useEffect не перересуется
        // и после этого isSearch снова false
        isSearch.current = false;
    }, [sort.sortProperty, categoryId, searchValue, currentPage]);

    useEffect(() => {
        // ***isMounted - false не было первого рендера и мы не парсим данные в строку URL
        if (isMounted.current) {
            // Берем все наши актуальые данные с редакса, и превращаем в строку
            const queryString = qs.stringify({
                sort: sort.sortProperty,
                categoryId,
                currentPage,
            });
            // И передаем ее в адресную строку URL
            navigate(`?${queryString}`);
        }
        // ***isMounted - true  был первый рендер, след. раз код выше сработает ^
        isMounted.current = true;
    }, [sort.sortProperty, categoryId, currentPage]);

    useEffect(() => {
        //Если в адресной строке есть параметры
        if (window.location.search) {
            //То мы их достаем (строчку), превращаем в объект и вырезаем "?" - substring
            const params = qs.parse(window.location.search.substring(1));
            // что бы передать sort (который объект) в редакс, делаем следующее:
            const sort = sortList.find(
                (obj) => obj.sortProperty === params.sort
            );
            // И передаем актуальные данные из адресной строки в редакс состояние
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            // делаем (isSearch) - true чтобы повторно не отправились fetchPizzas данные
            isSearch.current = true;
        }
    }, []);

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
