import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TSort = {
    name: string;
    sortProperty:
        | "rating"
        | "-rating"
        | "price"
        | "-price"
        | "title"
        | "-title";
};
export interface FilterSliceState {
    categoryId: number;
    currentPage: number;
    sort: TSort;
    searchValue: string;
}

const initialState: FilterSliceState = {
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
        onChangeCategory: (state, action:PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        onChangeSort: (state, action: PayloadAction<TSort>) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
        },
        setSearchValue: (state, action:PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
    onChangeCategory,
    onChangeSort,
    setCurrentPage,
    setFilters,
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
