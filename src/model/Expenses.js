const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
      ref: 'Users',
      required: [true, 'User ID is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

expenseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Expenses', expenseSchema);
