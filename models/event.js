const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const User = require("./User");

const eventSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  place: {
    type: String, 
    required: true 
  },
  subject: {
    type: String,
    required: false
  },  
  date: { 
    type: Date, 
    default: Date.now,
    required: true
  },
  numOfDays: {
    type: Number,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  conferences: {
    type: Schema.Types.ObjectId,
    ref: "Conference"
  },//implementar llenar esto
  exhibitors: {
    type: Schema.Types.ObjectId,
    ref: "Exhibitor"
  }//implemntar llenar esto
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
