const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://Ashwin:Ashwin@16@cluster0-ghy7c.mongodb.net/busdb?retryWrites=true&w=majority",{ useUnifiedTopology: true , useNewUrlParser: true })

const bookSchema= new mongoose.Schema({
    "bookingID":String,
    "busID":String,
    "userID":String,
    "userName":String,
    "busName":String,
    "seatNumber":Array,
    "source":String,
    "dest":String,
    "Departure":Date,
    "Arrival":Date,
    "dateOfBooKing":Date,
    'numberOfSeats':Number,
    'totalFare':Number,
    'status':String
})

const  bookingData = mongoose.model("Bookdata",bookSchema);

module.exports = bookingData;