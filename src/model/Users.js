const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'firstname is required'],
    },
    lastname: {
      type: String,
      required: [true, 'lastname is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favorites: {
      type: [String],
      default: [],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

userSchema.virtual('expenses', {
  ref: 'Expenses',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('income', {
  ref: 'Income',
  foreignField: 'user',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Users', userSchema);
