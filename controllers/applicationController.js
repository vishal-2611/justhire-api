const Application = require('../models/jobapplication');
const mongoose = require('mongoose');

module.exports = {
  addApplication: (req, res) => {
    let data = {
      candidateId: req.params.userId,
      recruiterId: req.body.recruiterId._id,
      jobId: req.body._id
    };
    const application = new Application(data);
    application
      .save()
      .then(savedApplication => {
        return res.json({
          error: false,
          message: 'Job Application Sent',
          data: savedApplication
        });
      })
      .catch(error => {
        console.log(error);
        return res
          .status(500)
          .json({ error: true, message: 'Error in Job Application' });
      });
  },
  getAppliedJobs: (req, res) => {
    Application.find({ candidateId: req.params.userId })
      .then(response => {
        return res.json({ error: false, data: response });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Error Occured' });
      });
  },
  getJobApplicants: (req, res) => {
    Application.find({ jobId: req.params.jobId })
      .populate('candidateId', 'name email')
      .then(response => {
        return res.json({ error: false, data: response });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal Error' });
      });
  }
};
