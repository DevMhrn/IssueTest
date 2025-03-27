require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mockInterviewRoutes = require('./routes/mockInterviewRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ping-pong health check endpoint
app.get('/ping', (req, res) => {
    console.log('pong');
  res.status(200).json({ message: 'pong', timestamp: new Date().toISOString() });
});

// Routes
app.use('/interview', mockInterviewRoutes);

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});