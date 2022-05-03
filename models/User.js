const Sequelize=require('sequelize')
const db = require("../database/db")
module.exports=db.sequelize.define(
   'couponmanagements',
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
         },
        S_no:{
            type:Sequelize.STRING
        },
        OfferName:
          {
           type:Sequelize.STRING 
         },
        CouponCode :{
          type:Sequelize.STRING
         },
         StartDate:{
             type:Sequelize.STRING
         },
         EndDate:{
            type:Sequelize.STRING
        },
        Status:{
            type:Sequelize.STRING
        },
       
    },{
        timestamps:false
    }
)
