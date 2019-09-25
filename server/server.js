const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

//create server
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(router)

app.listen(5000, function () {
    console.log('server is running')
})