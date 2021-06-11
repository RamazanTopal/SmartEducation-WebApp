const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
      type:String,
      required: true
  },
  role:{
    type: String,
    enum:["student", "teacher", "admin"],
    default: "student"
  },
  courses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'
  }]
});

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;