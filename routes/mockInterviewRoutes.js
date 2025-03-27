const express = require('express');
const router = express.Router();
const { triggerMockInterview } = require('../controllers/mockInterviewController');

router.get('/init', triggerMockInterview);

module.exports = router;