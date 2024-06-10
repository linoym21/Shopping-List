import React from 'react'
import { useSelector } from 'react-redux'
import Item from './Item';
function List() {
    const list = useSelector(state => state.list.list)
    console.log("im in list " + list);

    return (<>

        {list && list.length > 0 ? (
            list.map(item => (
                <Item data={item} />
            ))
        ) : (
            <div>List is empty!</div>
        )}
    </>

    )

}
export default List