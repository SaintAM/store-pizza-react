import React from "react";
import { useSelector } from "react-redux";
import { onChangeCategory, selectFilter } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";

const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

const Categories: React.FC = () => {
    const dispatch = useAppDispatch()
    const {categoryId} = useSelector(selectFilter)

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
