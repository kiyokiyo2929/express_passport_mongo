const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema({
    work:String,
    type:String,
});

const Work = mongoose.model("Work", workSchema);

module.exports = Work;