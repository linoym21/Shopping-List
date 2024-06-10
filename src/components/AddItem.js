
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/listSlice";


function AddItem() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const [error, setError] = useState('');

    const addItemHandler = (e) => {
        e.preventDefault();
        if (input.trim() === '') {
            setError('Item cannot be empty');
            alert('Item cannot be empty');
            return;
        }
        dispatch(addItem(input));
        setInput('');
        setError('');
    }
    return (
        <div className='card'>
            <form onSubmit={addItemHandler} className='flex-apart'>
                <input type='text' name='name' value={input} placeholder='Add item to list...' onChange={(e) => { setInput(e.target.value); setError(''); }} />
                <button className='btn purple' type='submit'>add</button>
            </form>
        </div>

    );


} export default AddItem;