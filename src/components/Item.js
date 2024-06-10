import React from 'react'
import { removeItem, decrementItem, incrementItem, toggleItemStrike } from "../features/listSlice";
import { useDispatch } from "react-redux";

export default function Item(props) {
    const dispatch = useDispatch()




    return (
        <div className='card flex-apart' key={props.data.id}> {/*להחליף את האינקס במזהה של המסד נתונים*/}
            <span className={props.data.isStriked ? ' green' : ' flex-apart '}> {props.data.text} </span>
            <span>
                <button className='btn' onClick={() => dispatch(decrementItem(props.data.id))} >-</button>
                <span>{" " + props.data.quantity + " "}</span>
                <button className='btn' onClick={() => dispatch(incrementItem(props.data.id))}>+</button>
            </span>
            <span><button className='btn pink' value={props.data.text} onClick={() => dispatch(toggleItemStrike(props.data.id))}>Done</button>
                &nbsp;
                <button className='btn' value={props.data.text} onClick={() => dispatch(removeItem(props.data.id))}>X</button>
            </span>

        </div>
    )
}













