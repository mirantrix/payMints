const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, maxlength:[20] },
  amount: { type: Number, required: true, max:[100000, "Must Be 6 or less numbers"] },
  date: { type: Number, required: true, max:[31, "Must Be 2 or less numbers"]},
  acronym: { type: String, maxlength:[4, "Must Be 4 or less letters"] },
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
