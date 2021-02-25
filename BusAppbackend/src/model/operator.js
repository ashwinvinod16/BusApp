const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://Ashwin:Ashwin@16@cluster0-ghy7c.mongodb.net/busdb?retryWrites=true&w=majority",{ useUnifiedTopology: true , useNewUrlParser: true })

const operatorSchema= new mongoose.Schema({
    "Name":String,
    "MobileNumber":String,
    "Email":String,
    "Password":String,
    'operatorId':String
})

const  operator = mongoose.model("operator",operatorSchema);

module.exports = operator;