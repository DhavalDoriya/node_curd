const mongoose = require('mongoose');
const conn = require("../conn");

const todoSchema = new mongoose.Schema({
  title:String,
   desc:String,
   image:String
  });

  const Todo = mongoose.model('todo', todoSchema);
  module.exports = Todo;
