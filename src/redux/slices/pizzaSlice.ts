import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type TPizzaParams = {
    category: string;
    currentPage: string;
    sortBy: string;
    order: string;
    search: string;
};
export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};
interface PizzaSliceState {
    items: Pizza[];
    status: "idle" | "pending" | "succeeded" | "failed";
}

export const fetchPizzas = createAsyncThunk<Pizza[],TPizzaParams>(
    "pizza/fetchPizzasStatus",
    async ({ category, currentPage, sortBy, order, search }) => {
        const { data } = await axios.get<Pizza[]>(
            `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    }
);

const initialState: PizzaSliceState = {
    items: [],
    status: "idle",
};

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Pizza[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = "pending";
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "succeeded";
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = "failed";
            state.items = [];
        });
    },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
