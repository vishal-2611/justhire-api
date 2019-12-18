const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: 'JobPosting'
  },
  candidateId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  recruiterId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
