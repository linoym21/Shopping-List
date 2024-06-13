const mongoose= require('mongoose');

const itemSchema=mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title: {type: String, required:true},
    categoryId: {type:mongoose.Schema.Types.ObjectId , required:true ,ref: 'Category'},
    quantity:  { type: Number, default: 1 }
});

module.exports=mongoose.model('Item', itemSchema);