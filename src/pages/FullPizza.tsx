import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: string;
    }>();
    const { id } = useParams();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    "https://64861b03a795d24810b7b7ef.mockapi.io/items/" + id
                );
                setPizza(data);
            } catch (error) {
                alert("питтсы не найдены :(");
            }
        }
        fetchPizza();
    }, [id]);

    if (!pizza) return <>Загрузка...</>;

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="pizzaPicture" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;
