const mongoose= require('mongoose');

const itemSchema=mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,// id item
    title: {type: String, required:true},// the item- userInput, the user must input
    categoryId: {type:mongoose.Schema.Types.ObjectId , required:true ,ref: 'Category'},// the id of the category- userInput, the user must category
    quantity:  { type: Number, default: 1 } // default value of quantity is 1
});

module.exports=mongoose.model('Item', itemSchema);