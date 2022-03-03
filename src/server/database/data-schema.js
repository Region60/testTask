const { Schema, model } = require('mongoose')

const dataPay = new Schema({
    cardNumber: {
        type: String,
        required: true
    },    
    experationDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
})

module.exports = model('DataPay', dataPay)