const express=require('express')
const router=express.Router()
const multer=require('multer')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const Handlebars=require('handlebars')


//individual details using params

router.get('/students/:id',(req,res)=>
{   
    Student.findOne({_id:req.params.id})
    .lean()
    .then(std_details=>{
        res.render('./students/get-student.handlebars',{std_details})
    })
    .catch(err=>{console.log(err)})
  
})

//handlebar helper function

Handlebars.registerHelper('splitUrl', url=> {
    var result=[...url].splice(6).join("")
    return new Handlebars.SafeString(result);
    });

//load student schema
require('../Model/student')
const Student=mongoose.model('StudentSchema')

//load storage module
const uploadlocal=require('../config/multer');
var upload=multer({storage:uploadlocal.storage})

//all get routes 

router.get("/add-student",(req,res)=>
{
    res.render("./students/add-students.handlebars")
})

//router data  from database

router.get('/students',(req,res)=>{
    Student.find({})
    .lean()
    .then(student=>
    {
        res.render("./students/get-students.handlebars",{student})
        
    })
    .catch(err=>{console.log(err)})
})

//all post routes
router.post("/add-student",upload.single("student_photo"),(req,res)=>
{
            // res.render("./students/add-students.handlebars")
            
            let errors=[]
            if(!req.body.student_id)
            {
                errors.push({text:"Id filed is required"})
            }
            if(!req.body.student_name)
            {
                errors.push({text:"Name field is required"})
            }
            if(!req.body.student_dob)
            {
                errors.push({text:"dob field is required"})
            }
            if(!req.body.student_location)
            {
                errors.push({text:"location field is required"})
            }
            if(!req.body.student_skills)
            {
                errors.push({text:"skills field is required"})
            }
            if(!req.body.student_education)
            {
                errors.push({text:"education field is required"})
            }
            if(!req.body.student_email)
            {
                errors.push({text:"email field is required"})
            }
            if(!req.body.student_phone)
            {
                errors.push({text:"Phone field is required"})
            }
            if(!req.body.student_gender)
            {
                errors.push({text:"gender field  is required"})
            }
            if(!req.body.student_percentage)
            {
                errors.push({text:"percentage field  is required"})
            }
            if(errors.length>0)
            {
                res.render("students/add-students.handlebars",{
                    errors:errors,
                    id :req.body.student_id,
                    name :req.body.student_name,
                    dob:req.body.student_dob,
                    location :req.body.student_location,
                    skills :req.body.student_skills,
                    education :req.body.student_education,
                    email :req.body.student_email,
                    phone :req.body.student_phone,
                    gender :req.body.student_gender,
                    percentage :req.body.student_percentage,
                    
                }) 

            }
                else
             {
                let{ student_name,
                    student_id,
                    student_dob,                    
                    student_location,
                    student_skills,
                    student_education,
                    student_email,
                    student_phone,
                    student_gender,
                    student_percentage}=req.body
                
                    let newStudent=
                    {
                        student_photo:req.file,
                        student_name,
                        student_id,
                        student_dob,
                        student_location,
                        student_skills,
                        student_education,
                        student_email,
                        student_phone,
                        student_gender,
                        student_percentage
                    }    
            
                    new Student(newStudent).save().then().catch(err=>console.log(err))
                    res.redirect(302,'/')
             }   


    
})


module.exports=router