const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate")

const workSchema = new Schema({
    name:String,
    link:String,
    name:String,
    link:String,
    technologies:String,
    repositories:String,
    useReact:String,
    useNext:String,
    useNode:String,
    useMongo:String,
    image_1:String,
    image_2:String,
    image_3:String,
});

workSchema.plugin(mongoosePaginate)

const Work = mongoose.model("Work", workSchema);

module.exports = Work;