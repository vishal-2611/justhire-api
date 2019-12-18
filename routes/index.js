const userController = require('../controllers/userController');
const postingController = require('../controllers/postingController');
const applicationController = require('../controllers/applicationController');
const express = require('express');
const router = express.Router();

router.post('/user/login', userController.loginUser);
router.post('/user/auth', userController.addUser);

router.get('/recruiter/:userId/list', postingController.getRecruiterListing);
router.post('/recruiter/:userId/post', postingController.addPost);
router.put('/recruiter/:userId/post/:postId', postingController.editPost);
router.get('/seeker/:userId', postingController.getJobList);

router.post('/seeker/:userId/apply', applicationController.addApplication);
router.get(
  '/seeker/:userId/applications',
  applicationController.getAppliedJobs
);
router.get(
  '/recruiter/:jobId/applicants',
  applicationController.getJobApplicants
);

module.exports = router;
