const express = require('express');
const mongoose = require('../db/connect');
const taskdata=require('../models/TaskData');
var Schema = mongoose.Schema;
var NewUserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    family: {
        id: {
            type: String
        },
        head: {
            type: Boolean
        }
    },
    notification: [
        {
            message: String,
            date: Date,
        }
    ],
    requests: [
        {
            id: String,
            name: String,
            status: String
        }
    ]
});

var UserData = mongoose.model('user-data', NewUserSchema);
module.exports = UserData;