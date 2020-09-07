var mongoose=require("mongoose")
var filmSchema=new mongoose.Schema({
    name:String,
    type:String,
    image:String,
    description:String,
    year:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
        ]
});

module.exports = mongoose.model('Film',filmSchema);
