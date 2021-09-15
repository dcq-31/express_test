const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: { type: String, required: [true, "The car must have a model."] },
  cost: { type: Number, required: [true, "The car must have a cost sell."], min: [0, "The car's cost must be greater than zero."] }
})

module.exports = mongoose.model('Car', carSchema);