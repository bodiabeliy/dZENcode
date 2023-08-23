const  {Schema, model} = require('mongoose')

const User = new Schema({
    id: {type:Number, unique:true },
    title: {type:String},
    date: {type:String, },
    description: {type:String},
})

module.exports = model("Orders", User);