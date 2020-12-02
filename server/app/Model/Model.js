let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: {type: String},
  completed: {type: Boolean},
  datetime: {type: Date}
});

module.exports = mongoose.model("Todo", PostSchema);