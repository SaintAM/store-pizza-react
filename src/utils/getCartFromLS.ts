import { TCartItem } from "../redux/slices/cartSlice";
import { calcTotalPrise } from "./calcTotalPrise";

export const getCartFromLS = () => {
    const data = localStorage.getItem("cart");
    const items : TCartItem[] = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrise(items)
    return {
        items,
        totalPrice
    };
};
