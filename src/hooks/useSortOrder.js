import { useState } from 'react'

function useSortOrder() {
    const [sortOrder, setSortOrder] = useState('ASC');

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => {
            return prevOrder === 'ASC' ? 'DES' : 'ASC';
        })
    }

    return {sortOrder, toggleSortOrder }
}

export { useSortOrder }