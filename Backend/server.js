require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // for creating server
const { Server } = require('socket.io');

// Routes
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require("./routes/adminRoutes");

// Admin seeding
const createAdminIfNotExists = require('./utils/createAdmin');

const app = express();
const PORT = process.env.PORT || 4000;

// ---------------- CORS Setup ----------------
app.use(cors({
  origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5173',
  credentials: true,
}));

// ---------------- Body Parser ----------------
app.use(express.json());

// ---------------- Health Check ----------------
app.get('/', (req, res) => res.send('API is running'));

// ---------------- Routes ----------------
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use("/api/admin", adminRoutes);

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
.then(async () => {
  console.log('MongoDB connected');

  // Seed fixed admin
  await createAdminIfNotExists();

  // ---------------- Create HTTP server & Socket.IO ----------------
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5173' }
  });

  // Make io accessible in routes/controllers
  app.set('io', io);

  // Listen to client connections
  io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);

    // Optional: join room for specific user
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined room: ${userId}`);
    });

    socket.on('disconnect', () => console.log('❌ Client disconnected:', socket.id));
  });

  // Start server
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
