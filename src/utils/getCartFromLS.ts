import { TCartItem } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem("cart");
    const items : TCartItem[] = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items)
    return {
        items,
        totalPrice
    };
};
