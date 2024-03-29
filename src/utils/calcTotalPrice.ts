import { TCartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: TCartItem[]) => {
    return items.reduce((acc, obj) => obj.price * obj.count + acc, 0);
};
