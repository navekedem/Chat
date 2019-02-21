const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  userName:{type: String ,required: true},
  message:{type: String ,required: true},
  userId:{type: String , required:true },
  sendTime:{type: String,required: true},
  imagePath:{type: String,required: true}
});

module.exports = mongoose.model('MessageModel' ,messageSchema);
