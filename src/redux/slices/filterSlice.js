import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: "rating",
    },
    searchValue: "",
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
        setFilters: (state, action) => {
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
    },
});

export const selectFilter = (state) => state.filter;

export const {
    onChangeCategory,
    onChangeSort,
    setCurrentPage,
    setFilters,
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
