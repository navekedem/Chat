const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const DbMessageModel = require('./models/messageModel');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//connect to database
mongoose.connect("mongodb+srv://NaveKed:6zosJnnQpDZdtEhK@clusterchatapp-yssli.mongodb.net/chat-app-db?retryWrites=true" ,{ useNewUrlParser: true }).then(()=>{

  console.log("DataBase Is Connected");
}).catch(()=>{
  console.log("DataBase Connection failed");
});


//allow requst from clients
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//get all messages from database
app.get("/api/messages",(req,res,next) => {

  DbMessageModel.find().then(allMessages => {


    res.status(200).json(allMessages);
  })
});



//add new message to database
app.post("/api/messages" ,(req,res,next) => {
  const newMessage = new DbMessageModel({
    userName: req.body.userName,
    message: req.body.message,
    userId: req.body.userId,
    sendTime: req.body.sendTime,
    imagePath: req.body.imagePath
  });

  newMessage.save();
  res.status(201).json({
    message: "Message Added"
  });

});

module.exports = app;
