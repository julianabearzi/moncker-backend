const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

incomeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Income', incomeSchema);
