const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://Ashwin:Ashwin@16@cluster0-ghy7c.mongodb.net/busdb?retryWrites=true&w=majority",{ useUnifiedTopology: true , useNewUrlParser: true })

const busRouteSchema= new mongoose.Schema({
    "busID":String,
    "operatorId":String,
    "busName":String,
    "startingPoint":String,
    "endPoint":String,
    "Departuretime":String,
    "numberOFSeats":Number,
    "typeOfBus":String,
    "farePerPerson":Number,
    "regularPassenger":Array,
    "Availability":[{
        date:String,
        seats:Number
    }]
})

const  busData = mongoose.model("Busdata",busRouteSchema);

module.exports = busData;