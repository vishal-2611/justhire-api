const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  company: {
    type: String,
    required: false
  },
  userType: {
    type: Number,
    default: 0
    /** JobSeeker 0
     *  Recruiter 1
     */
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, 8, function(err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

module.exports = mongoose.model('User', userSchema);
