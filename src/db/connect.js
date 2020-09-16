const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://abhinavkumar:8129983383@cluster0-sqn38.mongodb.net/HomeMS?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
// mongoose.connect('mongodb://localhost:27017/HMSDemo', { useNewUrlParser: true })
module.exports = mongoose;
