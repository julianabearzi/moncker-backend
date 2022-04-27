const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    type: {
      type: String,
      default: 'USD',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Income', incomeSchema);
