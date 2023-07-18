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




