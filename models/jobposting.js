const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    required: true
  },
  recruiterId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('JobPosting', JobPostingSchema);
