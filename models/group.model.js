const {Schema, model} = require("mongoose")

const groupSchema = new Schema ({
    title: {
        type: String,
    },
description: {
    type: String,
    required: false,
    trim: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
    
});

const group = model("group", groupSchema);
module.exports = group;





/*  test  */
// const { Schema, model } = require("mongoose");

// const groupSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: false,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: false,
//     trim: true
//   },
//   members: [{
//     type: Schema.Types.ObjectId,
//     ref: "User"
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Group = model("Group", groupSchema);

// module.exports = Group;
