const axios = require('axios');

const triggerMockInterview = async (req, res) => {
  try {
    // These would typically come from request query params or env variables
    const email = req.query.email || process.env.DEFAULT_EMAIL;
    const testSlug = req.query.test_slug || process.env.DEFAULT_TEST_SLUG;
    
    if (!email || !testSlug) {
      return res.status(400).json({
        error: 'Email and test_slug are required'
      });
    }

    const requestBody = {
      email: email,
      test_slug: testSlug,
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      name: ""
    };

    console.log('Issuing mock interview test:', requestBody);

    // Add the required API authentication headers
    const headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'X-Secret-Key': process.env.SCALER_SECRET_KEY,
      'X-Access-Key': process.env.SCALER_ACCESS_KEY
    };

    const response = await axios.post(
      'https://api.companion.scaler.com/api/mock_interview/issue-test',
      requestBody,
      { headers }
    );

    res.json({
      message: 'Mock interview test issued successfully',
      data: response.data
    });
  } catch (error) {
    console.error('Error triggering mock interview:', error);
    res.status(500).json({
      error: 'Failed to trigger mock interview',
      details: error.response?.data || error.message
    });
  }
};

module.exports = {
  triggerMockInterview
};