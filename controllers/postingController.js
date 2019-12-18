const Posting = require('../models/jobposting');

module.exports = {
  addPost: (req, res) => {
    req.body.recruiterId = req.params.userId;
    const posting = new Posting(req.body);
    posting
      .save()
      .then(savedPost => {
        return res.json({
          error: false,
          message: 'Job Posted Successfully',
          data: savedPost
        });
      })
      .catch(error => {
        console.log(error);
        return res
          .status(500)
          .json({ error: true, message: 'Error in Job Post' });
      });
  },
  getRecruiterListing: (req, res) => {
    Posting.find({ recruiterId: req.params.userId })
      .then(response => {
        return res.status(200).json({ error: false, data: response });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Server Error' });
      });
  },
  editPost: (req, res) => {
    Posting.findByIdAndUpdate(req.params.postId, req.body, { new: true })
      .then(response => {
        return res.json({
          error: false,
          message: 'Post Updated Successfully',
          data: response
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Error Occured' });
      });
  },
  getJobList: (req, res) => {
    Posting.find()
      .populate('recruiterId', 'name company')
      .then(response => {
        return res.json({ error: false, data: response });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal Error' });
      });
  }
};
