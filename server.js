const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

//let envelope = {id: 0, title: 'food', budget: 100, }

let envelopes = []

let nextId = 1
let totalBudget = 0

app.use(bodyParser.json())

// validates that the given envelope is of a valid format
function validateEnvelope(req, res, next) {
    const newEnvelope = req.body
    if (typeof newEnvelope.title !== "string" || typeof newEnvelope.budget !== "number") {
        return res.status(400).send('Invalid envelope')
    }
    next()
}

//This was a test to ensure a get request could be made and the server was set up properly
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

//post method for adding an envelope to our envelopes array and will update to totalBudget
app.post('/envelopes/', validateEnvelope, (req, res) => {
    const newEnvelope = req.body
    newEnvelope.id = nextId++
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})

//get method for all envelopes that have been created
app.get('/envelopes/all', (req, res) => {
    res.send(envelopes)
})


//get method for retreiving a specific envelope and seeing the contents
app.get('/envelopes/:id', (req, res) => {
    if (req.params.id > envelopes.length || req.params.id < 1) {
        res.status(400).send('The given id was not an id of an envelope.')
    }
    for (let i = 1; i < envelopes.length; i++) {
        if (req.params.id === envelopes[i].id) {
            res.send(envelopes[i])
        }
    }
})
//starts the server listening on the desired port and states the port being listened to
app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`)
})