import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChangeCategory } from "../redux/slices/filterSlice";

const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

const Categories = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filter.categoryId)

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li
                        key={index}
                        className={categoryId === index ? "active" : ""}
                        // onClick={() => onChangeCategory(index)}
                        onClick={() => dispatch(onChangeCategory(index))}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
