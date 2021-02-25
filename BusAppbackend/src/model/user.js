const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://Ashwin:Ashwin@16@cluster0-ghy7c.mongodb.net/busdb?retryWrites=true&w=majority",{ useUnifiedTopology: true , useNewUrlParser: true })

const userSchema= new mongoose.Schema({
    "Name":String,
    "MobileNumber":String,
    "Email":String,
    "Password":String,
    'userID':String
})

const  userData = mongoose.model("Userdata",userSchema);

module.exports = userData;