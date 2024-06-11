const express=require('express');
const router=express.Router();
const {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    getItem
}= require('../controllers/item')

router.get('/', getAllItems);
router.post('/', createItem);
//id is parameter that we need because we need to now what to change
router.get('/:itemId',getItem)
router.patch('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

module.exports= router;