const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        default: '',
    },
    note: {
        type: String,
        default: '',
    },
    motto: {
        type: String,
        default: '',
    },
    focusArea: {
        type: String,
        default: '',
    },
    progress: {
        type: Number,
        default: 0,
    },
    tasksCompleted: {
        type: Number,
        default: 0,
    },
    totalTasks: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
    },
    googleId: {
        type: String,
        default: null,
    },
    journals: [{
        date: { type: Date, default: Date.now },
        text: String
    }],
    tag: {
        type: String,
        required: false // Fixed: Make optional so old accounts don't break on save
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        text: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
