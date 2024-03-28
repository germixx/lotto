const mongoose = require('mongoose')

const { Schema } = mongoose
mongoose.Promise = global.Promise
// mongoose.set('debug', true)
const dmSchemas = new Schema({
    playDate: {
        type: String,
        required: true
    },
    prediction: {
        type: Object,
        required: true
    },
    result: {
        type: String
    },
    time_input: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.models.Predictions || mongoose.model('Predictions', dmSchemas)