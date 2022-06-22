const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    
    dishId:{
        type:Number
    },
    rating:{
        type: Number
    },
    comment: {
        type: String
    },
    author:{
        type:String
    },
    date:{
        type:String
    }
});

const promotions = mongoose.model("promotions", new Schema({}), "promotions")
const dishes   = mongoose.model("dish", new Schema({}), "dish")
const leader   = mongoose.model("leader", new Schema({}), "leader");


 const comment = mongoose.model("comment", commentSchema,"comment");

module.exports = {promotions, dishes,comment, leader};