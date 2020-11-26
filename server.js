const express = require('express')
const app = express()

const PORT = 3000

let envolope = {id: 0, title: 'food', budget: 100, }

const envolopes = []
let nextId = 1
let totalBudget = 0

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.post('/envolopes', (req, res) => {
    const newEnvolope = req.body
    newEnvolope.id = nextId++
    envolopes.push(newEnvolope)
    res.status(201).send(newEnvolope)
})

app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`)
})