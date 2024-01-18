import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { calcTotalPrise } from "../../utils/calcTotalPrise";
import { getCartFromLS } from "../../utils/getCartFromLS";

export type TCartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    size: number;
    type: string;
    count: number;
};
export interface CartSliceState {
    totalPrice: number;
    items: TCartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<TCartItem>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            findItem
                ? findItem.count++
                : state.items.push({ ...action.payload, count: 1 });

            state.totalPrice = calcTotalPrise(state.items);
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) findItem.count--;
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            );
        },
        clearItem: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCartById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
