const express=require('express');
const router=express.Router();
const {
    getAllItems,
    createItem,
    decreaseItemQuantity,
    deleteItem,
    increaseItemQuantity
}= require('../controllers/item')

router.get('/', getAllItems);
router.post('/', createItem);
router.delete('/', deleteItem);
router.patch('/increaseQuantity', increaseItemQuantity);
router.patch('/decreaseQuantity', decreaseItemQuantity);

module.exports= router;