const { Schema, model } = require("mongoose");

const ChatShema = new Schema({
  bot: { type: Boolean, required: false },
  message: { type: String, required: true },
  date: { type: String, required: false },
});

module.exports = model("ModelChat", ChatShema);
