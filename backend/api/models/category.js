const mongoose= require('mongoose');

const categorySchema=mongoose.Schema({
   _id: {type: String, required:true},//name of categoey
});

module.exports=mongoose.model('Category', categorySchema);