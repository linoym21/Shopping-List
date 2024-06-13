const Category=require('../models/category');
const mongoose= require('mongoose');



module.exports={

    getAllCategories:(req,res)=>{
        Category.find().then((categories)=>{
            res.status(200).json({
                categories     
           })
          }).catch(error=>{
            res.status(500).json({
                error
            })
        });
    },
 // im not create category it is bulid in

   createCategory:(req,res)=>{
        const {title}=req.body;
        const category =new Category({
            _id:  new mongoose.Types.ObjectId(),
            title
        });

        category.save().then(()=>{
            res.status(200).json({
                message: 'Created category'
            })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        });
    },
    getCategory:(req,res)=>{
        const categoryId=req.params.categoryId
        
        Category.findById(categoryId).then((category)=>{
           res.status(200).json({
            category
        })
        }).catch(error=>{
            res.status(500).json({
                error
            })
        }); 
    },
    // im not updating category
    updateCategory:(req,res)=>{

        const categoryId=req.params.categoryId

        Category.updateOne({_id:categoryId}, req.body).then(()=>{
          res.status(200).json({
              // message: `update category-  ${categoryId}`
              message: 'category updated '
          })
          }).catch(error=>{
              res.status(500).json({
                  error
              })
          });
    },
    // im not delete category
    deleteCategory:(req,res)=>{
        const categoryId=req.params.categoryId
        Category.deleteOne({_id: categoryId}).then(()=>{
           res.status(200).json({
               // message: `Delete category-  ${categoryId}`
               message: `category _id: ${categoryId} Deleted`
           
           })
        }).catch(error=>{
               res.status(500).json({
                   error
               })
           });
    }
}