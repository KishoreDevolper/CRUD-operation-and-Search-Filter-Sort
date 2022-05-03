const express = require('express')

const Router = express.Router()

const cors =require("cors")

const User = require("../models/User")

const Joi = require("joi")

const schema = Joi.object({
    S_no:Joi.string().required(),
    OfferName:Joi.string().required(),                                                                                                                            
    CouponCode:Joi.string().required(),
    StartDate:Joi.string().required(),
    EndDate:Joi.string().required(),
    Status:Joi.string().required()
})

Router.use(cors())

process.env.SECRET_KEY ='secret'

//post method  of the user

Router.post("/create",(req,res)=>{
    
const userdata ={
        S_no:req.body.S_no,
        OfferName:req.body.OfferName,
        CouponCode:req.body.CouponCode,
        StartDate:req.body.StartDate,
        EndDate:req.body.EndDate,
        Status:req.body.Status,
}
    const {error} = schema.validate(userdata)
    if(error){
       res.send(error)
    }else
    User.create(userdata).then(()=>res.send("Data Saved sucessfully!!!"))
     
})


//put method the user

Router.put("/update/:id",(req,res)=>{
       
 const reqData ={
        S_no:req.body.S_no,
        OfferName:req.body.OfferName,
        CouponCode:req.body.CouponCode,
        StartDate:req.body.StartDate,
        EndDate:req.body.EndDate,
        Status:req.body.Status,
    }
    const {error} = schema.validate(reqData )
        if(error){
           res.send(error)
        }else
        User.update(reqData,{
            where:{id:req.params.id}
        }).then(()=> res.send("Data Updated Sucessfully!!!..."))
    
    })

//Sort using StartDate
    
Router.get("/all",(req,res)=>{
        User.findAll({
            order: [
                ['StartDate', 'DESC'],
            
            ],
            attributes: ['S_no', 'Offername', 'Couponcode', 'StartDate','EndDate','Status']
        }).then((test)=> res.send(test))
    })


//filter method
 
Router.get("/filter/:couponcode",(req,res)=>{
    User.findAll({
        attributes:['offername','couponcode','StartDate','EndDate','Status'],
        where:{
        CouponCode:req.params.couponcode
        }
    }).then((!User,(result)=>{
        if(result){
            res.send(result)
      
        }
    }))
 })

//search method

Router.get("/search/:offername",(req,res)=>{
    User.findOne({
        attributes:['S_no','offername','couponcode','couponcode','StartDate','EndDate','Status'],
        where:{
          offername:req.params.offername
        }
    }).then((!User,(result)=>{
        if(result){
            res.send(result)
        }
    }))
 })

 
// Get single user details

Router.get("/getsingleuser:id",(req,res)=>{
    User.findOne({
        where:{
            id:req.params.id
        }
    }).then((!User,(results)=>{
          if(results){
              res.send(results)
          }
          else{
              res.send("user details not found")
          }
    }))
})





// delete Method 

Router.delete("/deleteuser/:id",(req,res)=>{
    User.destroy({
        where:{id:req.params.id}
    }).then(() => res.send("data deleted sucessfully!!!"))
})

Router.get("/all",(req,res)=>{
    User.findAll().then((test)=> res.send(test))
})

module.exports = Router