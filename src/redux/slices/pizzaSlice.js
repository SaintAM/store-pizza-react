import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async ({ category, currentPage, sortBy, order, search }) => {
        const { data } = await axios.get(
            `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    }
);

const initialState = {
    items: [],
    status: "idle",
};

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status = "pending";
    //         state.items = [];
    //         console.log(state, "ожидание получения данных");
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = "succeeded";
    //         console.log(state, " получение пицц");
    //     },
    //     [fetchPizzas.rejected]: (state) => {
    //         state.status = "failed";
    //         state.items = [];
    //         console.log(state, "ошибка получения пицц");
    //     },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = "pending";
            state.items = [];
            console.log(state.status, "ожидание получения данных");
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "succeeded";
            console.log(state.status, " получение пицц");
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = "failed";
            state.items = [];
            console.log(state, "ошибка получения пицц");
        });
    },
    // },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
