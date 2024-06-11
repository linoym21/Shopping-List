const express=require('express');
const app=express();
const morgan=require('morgan');
const itemsRoutes= require('./api/routes/items')
const categoriesRoutes= require('./api/routes/categories')
const mongoose=require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@shopping-list-api.07vf5zq.mongodb.net/?retryWrites=true&w=majority&appName=shopping-List-api`);



//when we are in function - we connect to database
mongoose.connection.on('connected',()=>{
    console.log('MongoDB Connected');
})
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended:false,
}));

// כדי להתגבר על כך שהקליינט והסרבר נמצאים בשרתים שונים , פונקציית נקסט היא פונקציה שמצביעה לפולואו הבא של אקספרס
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","origin, X-Requested-With, Content-Type,Accept,Authorization" );
if(req.method==="OPTIONS"){
    res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});

}
next();
});



//Routes

app.use('/items',itemsRoutes);
app.use('/categories',categoriesRoutes);

app.use((req,res,next)=>{
    const error= new Error ('Not Found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status|| 500);
    res.json({
        error:{ 
            message: error.message
            
        }
    })
})
module.exports=app;