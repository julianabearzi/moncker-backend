const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    type: {
      type: String,
      default: 'USD',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    category: {
      type: String,
      enum: [
        'Food',
        'Bills & utilities',
        'Entertainment',
        'Transportation',
        'Health & personal care',
        'Personal Spending',
        'Others',
        'Housing',
      ],
      required: [true, 'Category is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Expenses', expenseSchema);
