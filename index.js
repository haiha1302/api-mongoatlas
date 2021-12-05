const express = require('express')
const usersApi = require('./api/users')
const { connectToMongo } = require('./database')

const app = express()

require('dotenv').config();

app.use(express.json())
app.use('/users', usersApi)

connectToMongo()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server is running at post 5000!!!');
})