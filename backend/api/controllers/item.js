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
    createItem:(req,res)=>{

        const {title,categoryId,quantity}=req.body;
        const item =new Item({
            _id:  new mongoose.Types.ObjectId(),
            title,
            categoryId,
            quantity
        });

        item.save().then(()=>{
            res.status(200).json({
                message: 'Created item'
            })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        });

        
    },
    //using for increase and decrease quantity
   updateItem:(req,res)=>{
    const itemId=req.params.itemId

    Item.updateOne({_id:itemId}, req.body).then(()=>{
        res.status(200).json({
            message: 'item updated '
        })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        });

   
    },

    //whene quantity=0 or buttun delete
    deleteItem:(req,res)=>{

     const itemId=req.params.itemId
     Item.deleteOne({_id: itemId}).then(()=>{
        res.status(200).json({
            message: `item _id: ${itemId} Deleted`
        
        })
     }).catch(error=>{
            res.status(500).json({
                error
            })
        });
    
    },
    getItem:(req,res)=>{
        const itemId=req.params.itemId
        Item.findById(itemId).then((item)=>{
           res.status(200).json({
            item
        })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        }); 
    }

}