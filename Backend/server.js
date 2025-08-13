require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- CORS Setup ----------------
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Use env variable for flexibility
  credentials: true,
}));

// ---------------- Body Parser ----------------
app.use(express.json());

// ---------------- Health Check ----------------
app.get('/', (req, res) => res.send('API is running'));

// ---------------- Routes ----------------
app.use('/api/auth', authRoutes);

// ---------------- Global Error Handler ----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' });
});

// ---------------- Connect to MongoDB ----------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
