const {Schema, model} = require("mongoose")

const groupSchema = new Schema ({
    title: {
        type: String,
    },
    
});

const group = model("group", groupSchema);
module.exports = group;