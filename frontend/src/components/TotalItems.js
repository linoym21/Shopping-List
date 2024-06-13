import React from 'react';
import { useSelector } from 'react-redux';

const TotalItems = () => {
    const totalItems = useSelector(state => state.totalItems);

    return (
        <div>
            Total Items: {totalItems}
        </div>
    );
};

export default TotalItems;
