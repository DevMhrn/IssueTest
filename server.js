require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mockInterviewRoutes = require('./routes/mockInterviewRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/interview', mockInterviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});