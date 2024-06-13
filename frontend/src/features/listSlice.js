
import { createSlice, nanoid } from '@reduxjs/toolkit'
import {deleteItemFromServer,decreaseItemQuantity,increaseItemQuantity,addItemToServer} from '../utils/updateServer'

const initialState = {
    list: {
        'Vegetables And Fruits': [],
        'Cheeses': [],
        'Cleaning Products': [],
        'Meat And Fish': [],
        'Pastries': []
    },
    totalItems: 0,
}

export const listSlice = createSlice(
    {
        name: 'listAction',
        initialState,
        reducers: {
            addItem: (state, action) => {
                const categoryList = state.list[action.payload.category];

                const existingItem = categoryList.find(item => item.text === action.payload.text);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.list[action.payload.category].push({
                        id: nanoid(),
                        text: action.payload.text,
                        quantity: 1,
                        isStriked: false,
                        category: action.payload.category,

                    });

                }
                state.totalItems = Object.values(state.list).reduce((total, categoryItems) => {
                    categoryItems.forEach(item => {
                        total += item.quantity;
                    });
                    return total;
                }, 0);

                addItemToServer(action.payload.text, action.payload.category);

                
               
            },
            removeItem: (state, action) => {
                const { category } = action.payload;
                const categoryList = state.list[category];
                if (!categoryList) {
                    console.error(`Category ${category} not found`);
                    return;
                }
                const updatedCategory = categoryList.filter(item => item.id !== action.payload.id);
                state.list[category] = updatedCategory;
                state.totalItems = Object.values(state.list).reduce((total, categoryItems) => {
                    categoryItems.forEach(item => {
                        total += item.quantity;
                    });
                    return total;
                }, 0);

                deleteItemFromServer( action.payload.text, action.payload.category);


            },
            decrementItem: (state, action) => {
            
                const categoryList = state.list[action.payload.category];
                const existingItem = categoryList.find(todo => todo.id === action.payload.id);
                if (existingItem && existingItem.quantity > 0) {
                    if(existingItem.quantity === 1){
                        state.list[action.payload.category] = categoryList.filter(todo => todo.id !== action.payload.id);
                        deleteItemFromServer( action.payload.text, action.payload.category);
                    }else{
                     decreaseItemQuantity(action.payload.text, action.payload.category);   
                    existingItem.quantity -= 1;
                    }
                }
                state.totalItems = Object.values(state.list).reduce((total, categoryItems) => {
                    categoryItems.forEach(item => {
                        total += item.quantity;
                    });
                    return total;
                }, 0);


            },
            incrementItem: (state, action) => {
                const categoryList = state.list[action.payload.category]; 
                const existingItem = categoryList.find(todo => todo.id === action.payload.id); 
                if (existingItem) {
                    existingItem.quantity += 1;
                }
                state.totalItems = Object.values(state.list).reduce((total, categoryItems) => {
                    categoryItems.forEach(item => {
                        total += item.quantity;
                    });
                    return total;
                }, 0);
                increaseItemQuantity(action.payload.text, action.payload.category);

            },
            updateList: (state,action)=>{
                const { items } = action.payload;                
    
                items.forEach(item => {
                    const categoryTitle = item.categoryId.title;
                    state.list[categoryTitle].push({
                        id: item._id,
                        text: item.title,
                        quantity: item.quantity,
                        isStriked: false,
                        category: categoryTitle
                    });
                });
    
                state.totalItems = items.reduce((total, item) => {
                    return total + item.quantity;
                }, 0);

            }

        }

    })
export const { addItem, removeItem, decrementItem, incrementItem,updateList } = listSlice.actions
export default listSlice.reducer
