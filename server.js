const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { EDESTADDRREQ } = require('constants')

const PORT = process.env.PORT || 3000

//let envelope = {id: 0, title: 'food', budget: 100, }


//create variables for envelope array(array of objects) and the nextId used for the 
//id of the next envelope created
let envelopes = []

let nextId = 1

app.use(bodyParser.json())

// validates that the given envelope is of a valid format
function validateEnvelope(req, res, next) {
    const newEnvelope = req.body
    if (typeof newEnvelope.title !== "string" || typeof newEnvelope.budget !== "number") {
        return res.status(400).send('Invalid envelope')
    }
    next()
}

//used on the envelopes/:id route to get a specific envelope
app.use('/envelopes/:id', (req, res, next) => {
    const envelopeId = Number(req.params.id)
    const envelopeIndex = envelopes.findIndex(envelope => envelope.id === envelopeId)

    if (envelopeIndex === -1) {
        res.status(400).send('The given id was not an id of an envelope.')
    }
    
    req.envelopeIndex = envelopeIndex
    next()
})

//This sends a message to the user about what this app can do and what it does
app.get('/', (req, res) => {
    res.send('Hello, World! This API allows you to create a personal budget and use the envelope budgeting method.')
})

//post method for adding an envelope to our envelopes array
app.post('/envelopes/', validateEnvelope, (req, res) => {
    const newEnvelope = req.body
    newEnvelope.id = nextId++
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})


//get method for all envelopes that have been created
app.get('/envelopesall', (req, res) => {
    res.send(envelopes)
})


//get method for retreiving a specific envelope and seeing the contents
app.get('/envelopes/:id', (req, res) => {
    res.send(envelopes[req.envelopeIndex])  
})

app.put('/envelopes/:id', validateEnvelope, (req, res) => {
    const newEnvelope = req.body
    const envelopeId = Number(req.params.id)
    if( !newEnvelope.id || newEnvelope.id !== envelopeId) {
        newEnvelope.id = envelopeId
    }
    envelopes[req.envelopeIndex] = newEnvelope
    res.send(newEnvelope)
})

//method for deleting the specified envelope
app.delete('/envelopes/:id', (req, res) => {
    envelopes.splice(req.envelopeIndex, 1)
    res.status(204).send('Deleted the specified envelope')
})

//starts the server listening on the desired port and states the port being listened to
app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`)
})