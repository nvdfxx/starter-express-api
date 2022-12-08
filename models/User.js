const mongoose = require('mongoose')
const { getToken } = require('../utils')
const Schema = mongoose.Schema

const userSchema = new Schema({
    nickname: {
        type: String,
        reqired: true
    },
    token: {
        type: String,
        default: getToken(8)
    },
    date: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('user', userSchema)