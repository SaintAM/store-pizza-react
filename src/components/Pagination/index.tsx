import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import { useAppDispatch } from "../../redux/store";

type PaginationProps = {
    currentPage: number
}
const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
    const dispatch = useAppDispatch()
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
