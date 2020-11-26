const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

//let envolope = {id: 0, title: 'food', budget: 100, }

let envolopes = []

let nextId = 1
let totalBudget = 0

app.use(bodyParser.json())

// validates that the given envolope is of a valid format
function validateEnvolope(req, res, next) {
    const newEnvolope = req.body
    if (typeof newEnvolope.title !== "string" || typeof newEnvolope.budget !== "number") {
        return res.status(400).send('Invalid envolope')
    }
    next()
}

//This was a test to ensure a get request could be made and the server was set up properly
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

//post method for adding an envolope to our envolopes array and will update to totalBudget
app.post('/envolopes/', validateEnvolope, (req, res) => {
    const newEnvolope = req.body
    newEnvolope.id = nextId++
    envolopes.push(newEnvolope)
    res.status(201).send(newEnvolope)
})

//starts the server listening on the desired port and states the port being listened to
app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`)
})