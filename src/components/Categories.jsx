import React from "react";

const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

const Categories = ({ value, onChangeCategory }) => {
    // state add Home.jsx
    // const [activeIndex, setActiveIndex] = useState(0);
    // const onClickCategory = (index) => {
    //     setActiveIndex(index);
    // };

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li
                        key={index}
                        className={value === index ? "active" : ""}
                        onClick={() => onChangeCategory(index)}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
