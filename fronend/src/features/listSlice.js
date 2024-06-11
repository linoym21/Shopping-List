
import { createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios';

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
const addItemToServer = async (inputValue, category) => {
    try {
        console.log("im befor77777 server");
        console.log("inputValue "+ inputValue+" category: "+category);
      const response = await axios.post('http://localhost:8000/items', {
        title: inputValue,
        categoryId: category,
        //quantity: 1 // Assuming default quantity is 1
      });
      console.log("i in server"+response.data.message); // Log the response message from the server
    } catch (error) {
      console.error(error.response.data.error); // Log the error message from the server
    }
  };
export const listSlice = createSlice(
    {
        name: 'listAction',
        initialState,
        reducers: {
            addItem: (state, action) => {
                const categoryList = state.list[action.payload.category];//array of specific category

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

                console.log("im befor server");
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


            },
            decrementItem: (state, action) => {
            
                const categoryList = state.list[action.payload.category];
                const existingItem = categoryList.find(todo => todo.id === action.payload.id);
                if (existingItem && existingItem.quantity > 0) {
                    existingItem.quantity -= 1;
                    if (existingItem.quantity === 0) {
                        state.list[action.payload.category] = categoryList.filter(todo => todo.id !== action.payload.id);
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
            }

        }

    })
export const { addItem, removeItem, decrementItem, incrementItem } = listSlice.actions
export default listSlice.reducer
