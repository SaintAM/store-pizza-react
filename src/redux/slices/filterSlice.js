import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: "rating",
    },
};

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        onChangeCategory: (state, action) => {
            state.categoryId = action.payload;
        },
        onChangeSort: (state, action) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { onChangeCategory, onChangeSort, setCurrentPage } =
    filterSlice.actions;

export default filterSlice.reducer;
