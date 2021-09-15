const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "The user must have a name."],
    match: [/^[a-zA-Z]+$/i, "The user name must be composed by letters."],
    unique: true
  },
  money: {
    type: Number,
    default: 0,
    min: [0, "The user can not have less than zero dolars."]
  },
  cars: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);