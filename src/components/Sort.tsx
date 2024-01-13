import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TSort, onChangeSort, selectFilter } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";

export const sortList: TSort[] = [
    { name: "популярности ↑", sortProperty: "rating" },
    { name: "популярности ↓", sortProperty: "-rating" },
    { name: "цене ↑", sortProperty: "price" },
    { name: "цене ↓", sortProperty: "-price" },
    { name: "алфавиту ↑", sortProperty: "title" },
    { name: "алфавиту ↓", sortProperty: "-title" },
];

const Sort: React.FC = () => {
    const sortRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();
    const { sort } = useSelector(selectFilter);

    const onClickListItem = (obj: TSort) => {
        dispatch(onChangeSort(obj));
        setOpen(false);
    };

    useEffect(() => {
        //создаем отдельно функцию в области видимости useEffect
        const handleClickOutside = (event: MouseEvent) => {
            //данная функция закрывает попап окно за пределами попап-окна
            if (
                sortRef.current &&
                !event.composedPath().includes(sortRef.current)
            )
                setOpen(false);
        };
        //обращаемся к обработчику события click и вызываем функцию выше
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            // если перешли на др. страницу компонент размонитуется чтобы handleClickOutside
            // не пересоздавался кратно
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sort.name}</span>
            </div>
            {open && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((obj, index) => (
                            <li
                                onClick={() => onClickListItem(obj)}
                                key={index}
                                className={
                                    sort.sortProperty === obj.sortProperty
                                        ? "active"
                                        : ""
                                }
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
