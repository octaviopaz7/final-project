import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthdate: {
        type: Date
    },
    address: {
        type: String
    },
    medicalHistory: [{
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Patient', patientSchema);