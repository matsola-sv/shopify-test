import React, {useState, useEffect, useCallback} from 'react';
import './PaginatedList.css';
import {CollectionI} from "../../../models/common";
import {CursorType, PageInfoI} from "../../../models/common";
import Pagination from "../Pagination/Pagination";
import Preloader from "../Preloader/Preloader";

interface PaginatedListProps<E> {
    fetchData: (cursor: CursorType) => Promise<CollectionI<E> | null>;
    renderItem: (item: E) => React.ReactNode;
}

const PaginatedList = <E,>({ fetchData, renderItem }: PaginatedListProps<E>) => {
    const [items, setItems] = useState<E[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfoI>();
    const [loading, setLoading] = useState<boolean>(false);
    const [currentCursor, setCurrentCursor] = useState<CursorType>(null);
    const [cursorHistory, setCursorHistory] = useState<CursorType[]>([]);

    const loadItems = useCallback((cursor: CursorType): void => {
        setLoading(true);
        fetchData(cursor)
            .then(result => {
                if (result) {
                    setItems(result.items);
                    setPageInfo(result.pageInfo);
                    setLoading(false);
                }
            })
            .catch(console.error);
    }, [fetchData]);

    const handlePageChange = (newCursor: CursorType): void => {
        if (newCursor === pageInfo?.startCursor && cursorHistory.length > 0) {
            // Processing "previous" button
            const previousCursor = cursorHistory[cursorHistory.length - 2];
            setCursorHistory(cursorHistory.slice(0, -1));
            setCurrentCursor(previousCursor);
            loadItems(previousCursor);
        } else {
            // Processing "next" button
            setCursorHistory([...cursorHistory, newCursor]);
            setCurrentCursor(newCursor);
            loadItems(newCursor);
        }
    };

    useEffect(() => {
        loadItems(currentCursor);
    }, [fetchData]);

    const renderItems = (): React.ReactNode => {
        return items.map((item, index) => (
            <div key={index} className="list-item">
                {renderItem(item)}
            </div>
        ));
    };

    return (
        <div className="paginated-list">
            {loading && <Preloader/>}
            <div className="list-items">
                {renderItems()}
            </div>
            {pageInfo && (
                <Pagination
                    pageInfo={pageInfo}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default PaginatedList;
