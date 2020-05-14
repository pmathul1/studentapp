const expess=require('express');
const app=expess();
const handlebar=require('express-handlebars');
const mongoose=require('mongoose');
const studentroutes=require('./Router/studentroutes.js')
require('dotenv').config()
const bodyparser=require('body-parser')


//body-parser
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.engine('handlebars',handlebar())
app.set('view-engine',"handlebars")

//serving static files
app.use(expess.static(__dirname + "/public"))
app.use(expess.static(__dirname + "/node_modules"))

//mongodb connection 
mongoose.connect(process.env.mongodbUrl,
    {
        useUnifiedTopology:true,
        useCreateIndex:true,
        useNewUrlParser:true
    },err=>
    {if(err)
        throw err;
     console.log("mongodb connection successful")   
    })
app.use('/student',studentroutes)

app.get('/',(req,res)=>
    {
        res.render('home.handlebars')
    })
app.get('**',(req,res)=>
    {
        res.render('404errorpage.handlebars')
    })
app.listen(process.env.PORT,err=>
    {
        if(err)
        throw err
        console.log("express server running succesfully on portno:"+process.env.PORT)
    })
