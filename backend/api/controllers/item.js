const   Item=require('../models/item');
const mongoose= require('mongoose');
const Category=require('../models/category');


module.exports={

getAllItems:(req,res)=>{

    Item.find().populate('categoryId','title').then((items)=>{
        res.status(200).json({
            items     
        })
    }).catch(error=>{
        res.status(500).json({
        error
    })
});
},
createItem: async (req, res) => {
    const { title, categoryTitle, quantity } = req.body;

    try {
        const category = await Category.findOne({ title: categoryTitle });
        if (!category) {
            console.error("Category not found");
            return res.status(404).json({
                error: 'Category not found'
            });
        }

        let existingItem = await Item.findOne({ title, categoryId: category._id });
        if (existingItem) {
            existingItem.quantity += 1; 
            await existingItem.save();  
            return res.status(200).json({
                message: 'Item quantity increased',
                item: existingItem       
            });
        }

        const item = new Item({
            _id: new mongoose.Types.ObjectId(),
            title,
            categoryId: category._id,
            quantity
        });

        await item.save();
        res.status(200).json({
            message: 'Created item',
            item: item 

        });
    } catch (error) {
        console.error("Error saving item:", error);
        res.status(500).json({
            error: error.message,

        });
    }
},
increaseItemQuantity :async (req,res)=>{
    const { title, categoryTitle } = req.body;

    try {
        const category = await Category.findOne({ title: categoryTitle });
        const item = await Item.findOne({ title: title, categoryId: category._id });

        if (!item) {
            return res.status(404).json({ message: "item not found" });
        }

        item.quantity += 1;
        await item.save();

        res.status(200).json({ message: `Item '${title}' in category '${categoryTitle}' updated` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
},
deleteItem: async (req, res) => {

    const { title, categoryTitle } = req.body;

    try {
        const category = await Category.findOne({ title: categoryTitle });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await Item.findOneAndDelete({ title: title, categoryId: category._id });

        res.status(200).json({ message: `Item '${title}' in category '${categoryTitle}' deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}, 
decreaseItemQuantity :async (req,res)=>{
    const { title, categoryTitle } = req.body;

    try {
        const category = await Category.findOne({ title: categoryTitle });
        const item = await Item.findOne({ title: title, categoryId: category._id });

        if (!item) {
          return res.status(404).json({ message: "item not found" });
        }

     item.quantity -= 1;
     
     await item.save();
     res.status(200).json({ message: `Item '${title}' in category '${categoryTitle}' updated` });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 }
}