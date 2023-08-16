const  {Schema, model, mongoose} = require('mongoose')

const File = new Schema({
    name: {type:String},
    type: {type:String},
    accessLink: {type:String},
    size: {type:Number, default: 0},
    dateCreate:{type:Date, default: Date.now()},
    path: {type:String, default: ''},
    user: {type:mongoose.Types.ObjectId, ref:"User"},
    parent: {type:mongoose.Types.ObjectId, ref:"File"},
    children: [{type:mongoose.Types.ObjectId, ref:"File"}],


})

module.exports = model("File", File);