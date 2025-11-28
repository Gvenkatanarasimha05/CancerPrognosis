const mongoose = require('mongoose');
require('dotenv').config();

const PatientData = require('./models/PatientData');

async function populatePatientData() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    const patient = await PatientData.findOne({ patientId: 1 }).populate('user');
    console.log('Patient Data:', patient);
  } catch (err) {
    console.error('Error populating patient data:', err);
  } finally {
    mongoose.disconnect();
  }
}

populatePatientData();
