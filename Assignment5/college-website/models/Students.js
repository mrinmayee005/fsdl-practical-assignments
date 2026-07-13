const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Step 1: Personal Details
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // Step 2: Academic Background
    course: { type: String, required: true },
    percentage: { type: String },
    passingYear: { type: String },

    // Step 3: Address Details
    address: { type: String },
    city: { type: String },
    pincode: { type: String },

    // Metadata
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);