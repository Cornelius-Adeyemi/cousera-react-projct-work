require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Serverless = require("serverless-http");
const router = express.Router()
const collections = require("../server/schema")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });

mongoose.connect("mongodb+srv://cornelius:yetunde1@cornelius.rqw2g6t.mongodb.net/cousera?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true });
const connection = mongoose.connection;



connection.on("error", function(err){
    console.log(err)
})

connection.once("open", function(){
    console.log("connection establish")
})



router.get("/dishes", async function(req,res){
  const dish = await collections.dishes.find({});
  
    res.json(dish);
    

})

router.get("/leader", async function(req,res){

  const leader = await collections.leader.find({});
    res.json(leader);
   
})


router.get("/promotions", async function(req,res){

const promotion = await collections.promotions.find({});
res.json(promotion);
})

router.get("/comment", async function(req,res){
 

const comment = await collections.comment.find({});
res.json(comment);

})


router.post("/comment/post", async function(req,res){

const newComment = new collections.comment({dishId:req.body.dishId,
rating:req.body.rating, comment:req.body.comment,author:req.body.author,date:req.body.date});


newComment.save(function(err, data){
    if(err){
       
        res.status(500).send({error: "something went wrong"});
        return
    }

    res.send(data)
})


})

app.use("/.netlify/functions/server", router)

module.exports.handler = Serverless(app)