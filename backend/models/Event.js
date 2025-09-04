const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"] 
  },
  phone: { 
    type: String, 
    match: [/^\+?[0-9]{7,15}$/, "Please provide a valid phone number"] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
