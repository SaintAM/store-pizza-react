import React, { useState } from "react";

const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onClickCategory = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? "active" : ""}
                        onClick={() => onClickCategory(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
