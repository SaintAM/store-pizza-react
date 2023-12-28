import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addItem: (state, action) => {
        //     state.items.push(action.payload);
        //     state.totalPrice = state.items.reduce(
        //         (acc, obj) => obj.price + acc,
        //         0
        //     );
        // },
        addItem: (state, action) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            findItem
                ? findItem.count++
                : state.items.push({ ...action.payload, count: 1 });

            state.totalPrice = state.items.reduce(
                (acc, obj) => obj.price * obj.count + acc,
                0
            );
        },
        minusItem: (state, action) => {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) findItem.count--;
        },
        removeItem: (state, action) => {
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

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;