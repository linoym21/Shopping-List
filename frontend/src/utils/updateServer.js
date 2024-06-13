import axios from 'axios';

const decreaseItemQuantity = async (title, categoryTitle) => {
    try {
        const response = await fetch('http://localhost:3000/items/decreaseQuantity', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                categoryTitle: categoryTitle
            })
        });
         await response.json();
        
    } catch (error) {
        console.error(error);
    }
};
const increaseItemQuantity = async (title, categoryTitle) => {
    try {
        const response = await fetch('http://localhost:3000/items/increaseQuantity', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                categoryTitle: categoryTitle
            })
        });
        const data = await response.json();
    } catch (error) {
        console.error(error);
    }
};
const deleteItemFromServer = async (title, categoryTitle) => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({         
                     title: title,
                categoryTitle: categoryTitle
            })
        };
       
         await fetch('http://localhost:3000/items', requestOptions);
        
       
    } catch (error) {
        console.error(error); 
    }
};

const addItemToServer = async (inputValue, category) => {
    try {
       
      const response = await axios.post('http://localhost:3000/items', {
        title: inputValue,
        categoryTitle: category,
        quantity: 1 
      });
    
      return response.data.item._id;
    } catch (error) {
      console.error(error.response.data.error); 
    }
  };
  export  {addItemToServer,deleteItemFromServer,increaseItemQuantity,decreaseItemQuantity};
