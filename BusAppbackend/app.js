const express= require('express');
const app = express();
const bodyparser= require('body-parser');
const cors= require('cors');
const path=require('path')
const userData = require('./src/model/user');
const bookData=require('./src/model/booking')
const busData=require('./src/model/bus')
const operatorData = require('./src/model/operator')
const bcrypt=require('bcrypt')
const saltRounds=10;
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));
app.set('model', './src/model');

app.set('port',process.env.PORT)




//route to user registration

app.post("/register/user",(req,res)=>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) throw err;
        bcrypt.hash(req.body.Password, salt, function(err, hash) {
          if (err) throw err;
          // newData.password = hash;
          req.body.Password=hash;
          userData.distinct("userID").then((ids)=>{
            let id;
            if(ids.length==0){
                id=1001
            }
            else{
                id=ids.pop()
                id=id.substr(4);
               
                id=Number(id)+1
                
            }

            req.body.userID="U132"+id;
          userData.findOne({$or: [{Email: req.body.Email}, {MobileNumber : req.body.MobileNumber}]}).then((data)=>{
          if(data){   
            res.json({"message":"❗️User already exists","flag":false})
          }
          else{
            const user=new userData(req.body)
            user.save()
            res.json({"message":"Registered successfully",
            "userId":req.body.userID,"flag":true})
          }
         })

        })

      })
    }) 
})


//route to  user login

app.post('/login/user',(req,res)=>{
   
  userData.findOne({$or: [{Email: req.body.userName}, {userID:req.body.userName},{MobileNumber : req.body.userName},]}).then((data)=>{
      if(data){
          bcrypt.compare(req.body.Password,data.Password,function(err,result){
  
              if (result){
                  var jwttoken= jwt.sign({ id : userData._id}, 'ashwinvinod',{expiresIn: '1d'});
                  res.json({
                      message:"",
                      token:jwttoken,
                      name:data.Name,
                      id:data.userID
                  })
              }
              else{
                  res.json({"message":"❗️Invalid password"})
              }
          })   
      }
      else{
          res.json({"message":"❗️Email Id doesn't exist"})
      }
  })



})


//route to operator registration

app.post("/register/operator",(req,res)=>{
  bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) throw err;
      bcrypt.hash(req.body.Password, salt, function(err, hash) {
        if (err) throw err;
        // newData.password = hash;
        req.body.Password=hash;
        operatorData.distinct("operatorId").then((ids)=>{
          let id;
          if(ids.length==0){
              id=1001
          }
          else{
              id=ids.pop()
              id=id.substr(5);
             
              id=Number(id)+1
              
          }

          req.body.operatorId="BOP29"+id;
        operatorData.findOne({$or: [{Email: req.body.Email}, {MobileNumber : req.body.MobileNumber}]}).then((data)=>{
        if(data){   
          res.json({"message":"❗️User already exists","flag":false})
        }
        else{
          const user=new operatorData(req.body)
          user.save()
          res.json({"message":"Registered successfully",
          "operatorId":req.body.operatorId,"flag":true})
        }
       })

      })

    })
  }) 
})


//route to login operator

app.post('/login/operator',(req,res)=>{
   
 operatorData.findOne({$or: [{Email: req.body.userName}, {userID:req.body.userName},{MobileNumber : req.body.userName},]}).then((data)=>{
      if(data){
          bcrypt.compare(req.body.Password,data.Password,function(err,result){
  
              if (result){
                  var jwttoken= jwt.sign({ id : operatorData._id}, 'ashwinvinod',{expiresIn: '1d'});
                  res.json({
                      message:"",
                      token:jwttoken,
                      name:data.Name,
                      id:data.operatorId
                  })
              }
              else{
                  res.json({"message":"❗️Invalid password"})
              }
          })   
      }
      else{
          res.json({"message":"❗️Email Id doesn't exist"})
      }
  })



})



//route to fetch userData

app.get('/userData/:id',(req,res)=>{
  userData.findOne({userID:req.params.id},{_id:0,Name:1,Email:1,MobileNumber:1}).then((data)=>{
     if(data){
       res.json({
         userDetail:data
       })
     }
     else{
       res.err("invalid")
     }  
    })
})

// route to register bus
app.post('/registerBus',(req,res)=>{
  
  busData.distinct("busID").then((ids)=>{
    let id;
    if(ids.length==0){
        id=1001
    }
    else{
        id=ids.pop()
        id=id.substr(5);
       
        id=Number(id)+1
        
    }

    req.body.busID="BUS63"+id;


  const busdetails= new busData(req.body) 
  busdetails.save()
  res.json({
    "message":"Bus registered successfully with BusId "+req.body.busID
  })
})
})

//route to fetch bus of particular operator

app.get('/operatoreWiseBus/:oprid',(req,res)=>{
  busData.find({operatorId:req.params.oprid}).then((buses)=>{
    res.json({bus:buses})
  })
})




// route to fetch bus details

app.get('/viewBus/:src/:dest',(req,res)=>{
  
  busData.find({startingPoint :req.params.src, endPoint : req.params.dest}).then((data)=>{
    console.log(data)
    res.send(data)
   
  })
})

//route  to book ticket
app.post('/bookTicket',(req,res)=>{
  bookData.distinct("bookingID").then((ids)=>{
    let id;
    if(ids.length==0){
        id=1001
    }
    else{
        id=ids.pop()
        id=id.substr(5);
       
        id=Number(id)+1
        
    }

    req.body.bookingID="62892"+id;
  const bookTicket=new bookData(req.body)
  bookTicket.save()
  res.json({
    "message":"successfully booked with booking id "+req.body.bookingID
  })
})
bookdate=new Date(req.body.Departure).toDateString()
busData.findOneAndUpdate({ busID:req.body.busID,Availability:{$elemMatch:{ date:bookdate } } },{$inc : {"Availability.$.seats" : -req.body.numberOfSeats} }).then((data)=>{
  if(!data){
    Availability={
      seats:36-req.body.numberOfSeats,
      currentDate:bookdate
    }
    console.log(Availability)
    busData.findOneAndUpdate({busID:req.body.busID},{$push: {Availability: { "date":bookdate,"seats":36-req.body.numberOfSeats }}},{new: true}).then((data)=>{
      console.log(data)
    })
    

  }
})

})

//route to get booked seat details of particular bus of a particular day

app.get('/bookDetails/:date/:busid',((req,res)=>{
 
  bookData.find({"busID":req.params.busid , "Departure":req.params.date}).select('seatNumber -_id').then((data)=>{
    if(data){
    res.json({
      seat:data
    })
  }
  else{
    res.err("invalid")
  }
  })
}))


//route to upcomming journey
app.get('/upcommingjourney/:userId',(req,res)=>{
  const livedate=new Date()
  bookData.find({userID:req.params.userId,status:"Booked",Departure:{$gt:livedate}}).then((data)=>{
    if(data){
    res.json({
      bookedTicket:data
    })
  }
  else{
    res.err("invalid")
  }
  })
})


//route to completed journey

app.get("/completedjourney/:userId",(req,res)=>{
  const livedate=new Date()
  bookData.find({userID:req.params.userId,status:"Booked",Departure:{$lt:livedate}}).then((data)=>{
    if(data){
    res.json({
      bookedTicket:data
    })
  }
  else{
    res.err("invalid")
  }
  })

})

app.get("/cancelledJourney/:userId",(req,res)=>{
  
  bookData.find({userID:req.params.userId,status:"Cancelled"}).then((data)=>{
    if(data){
    res.json({
      cancelledTicket:data
    })
  }
  else{
    res.err("invalid")
  }
  })

})

//route to update data
app.put('/updateData/:userId',(req,res)=>{
  console.log(req.body)
  userData.findOneAndUpdate({userID:req.params.userId},{$set:{Name:req.body.Name,MobileNumber:req.body.MobileNumber,Email:req.body.Email}}).then((data)=>{
    if (data){
      res.json({"message":"Successfully Updated"})
    }
  })
})

//route to ticket cancelling

app.put('/cancelTicket/:ticketid',(req,res)=>{
  
  bookData.findOneAndUpdate({bookingID:req.params.ticketid},{$set:{status:"Cancelled"}}).then((data)=>{
    res.json({
      "message":"Trip Cancelled",
      "Data":data
    })
  })

})

app.get('/available',(req,res)=>{
  console.log(req.body)
  busData.find({busID:req.body.busID,Availability:{$elemMatch:{ date:"Sun Aug 02 2020" } } }).then((data)=>{
    res.send(data)
  })
})


app.listen(4000,()=>{
  console.log("listening at 4000")
});
