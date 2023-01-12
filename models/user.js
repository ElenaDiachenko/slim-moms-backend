const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
    },
    password: {
      type: String,
      required: [true, 'Password is a required field'],
    },
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },

    bloodType: {
      type: String,
      default: null,
    },

    height: {
      type: Number,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    curWeight: {
      type: Number,
      default: null,
    },
    desWeight: {
      type: Number,
      default: null,
    },

    dailyCalorie: {
      type: Number,
      default: null,
    },
    notRecProducts: {
      type: Array,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = { User };
