




import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    list: {
        'vegetables and fruits': [],
        'cheeses': [],
        'cleaning products': [],
        'meat and fish': [],
        'pastries': []
    },
    totalItems: 0,
}

export const listSlice = createSlice(
    {
        name: 'listAction',
        initialState,
        reducers: {
            addItem: (state, action) => {
                const categoryList = state.list[action.payload.category];//array of specific category

                const existingItem = categoryList.find(item => item.text === action.payload.text);
                // console.log('Existing item:', existingItem);

                if (existingItem) {
                    existingItem.quantity += 1;
                    console.log('Item found:', existingItem.category);
                } else {
                    state.list[action.payload.category].push({
                        id: nanoid(),
                        text: action.payload.text,
                        quantity: 1,
                        isStriked: false,
                        category: action.payload.category,

                    });
                    // console.log('Item found:', existingItem.category);

                }
                state.totalItems = Object.values(state.list).reduce((total, categoryItems) => {
                    categoryItems.forEach(item => {
                        total += item.quantity; // או כל פעולה נוספת שתחשב את כמות הפריטים באופן מדויק
                    });
                    return total;
                }, 0);

                if (existingItem) {
                    console.log("Item add category: " + existingItem.category + " text: " + existingItem.text + " quantity: " + existingItem.quantity);
                } else {
                    console.log("Item not found:", action.payload.text);
                }

            },
            removeItem: (state, action) => {
                const { category, itemId } = action.payload;
                const categoryList = state.list[category];
                console.log("removeItem function the category is: " + action.payload.category)
                console.log("removeItem function the ID is: " + action.payload.id)

                console.log(" category list: " + state.list[category])

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
                // const categoryList = state.list[action.payload.category];//new
                // const existingItem = categoryList.find(todo => todo.id === action.payload.id);//new
                // // const existingItem = state.list.find(todo => todo.id === action.payload);
                // if (existingItem && existingItem.quantity > 0) {
                //     existingItem.quantity -= 1;
                //     if (existingItem.quantity === 0) {
                //         state.list = state.list.filter(todo => todo.id !== action.payload.id);
                //     }
                // }
                // state.totalItems = state.list.reduce((total, item) => total + item.quantity, 0);


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
                const categoryList = state.list[action.payload.category]; // מקבל את רשימת הפריטים בקטגוריה
                const existingItem = categoryList.find(todo => todo.id === action.payload.id); // מחפש את הפריט ברשימה
                // const existingItem = state.list.find(todo => todo.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                }
                // state.totalItems = state.list.reduce((total, item) => total + item.quantity, 0);
                state.totalItems = Object.values(state.list).reduce((total, categoryItems) => {
                    categoryItems.forEach(item => {
                        total += item.quantity;
                    });
                    return total;
                }, 0);


            },
            toggleItemStrike: (state, action) => {
                const existingItem = state.list.find(todo => todo.id === action.payload.id);
                if (existingItem) {
                    existingItem.isStriked = !existingItem.isStriked;
                }
            }

        }

    })
export const { addItem, removeItem, decrementItem, incrementItem, toggleItemStrike } = listSlice.actions
export default listSlice.reducer
