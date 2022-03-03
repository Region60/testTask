const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const DataPay = require('./database/data-schema')
const path = require('path')
const jsonParser = express.json()

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.use(cors())
app.post('/sendData', jsonParser, async(req, res) => {
    try {
        const { cardNumber, experationDate, cvv, amount } = req.body
        const dataPay = new DataPay({ cardNumber, experationDate, cvv, amount })

        const resData = await dataPay.save()

        return res.status(200).json({
            id: resData.id,
            amount: resData.amount
        })
    } catch (e) {
        console.log(e)
    }
})

async function start() {
    try {
        await mongoose.connect("mongodb+srv://maksim:8u2upvDe0W1dp945@cluster0-mjkka.mongodb.net/backEndGallery", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(8080)
    } catch (e) {
        console.log(e)
    }

}

start()