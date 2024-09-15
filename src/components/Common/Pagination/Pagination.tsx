import React, {FC} from "react";
import './Pagination.css';
import {CursorType, PageInfoI} from "../../../models/common";
import Button from "../Buttons/Button/Button";

interface PaginationProps {
    pageInfo: PageInfoI,
    onPageChange: (cursor: CursorType) => void
}

const Pagination: FC<PaginationProps> = ({ pageInfo, onPageChange }) => {
    return pageInfo && (
        <div className="pagination">
            <Button
                active={pageInfo.hasPreviousPage}
                onClick={() => onPageChange(pageInfo.startCursor)}
            >
                Previous
            </Button>
            <Button
                active={pageInfo.hasNextPage}
                onClick={() => onPageChange(pageInfo.endCursor)}
            >
                Next
            </Button>
        </div>
    );
};
export default Pagination;