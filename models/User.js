var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  profilepic: {
    type: String,
  },
  username: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  totalCheckins: {
    type: Number,
    default: 0
  },
  activeCheckin: {
    type: String
  },
  friends: [
    {
      type: String
    }
  ],
  friendRequests: [
    {
      type: String
    }
  ],
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", User);
