const cors = require('cors') //for providing a Connect/Express middleware that can be used to enable CORS with various options
const bodyParser = require('body-parser') // parses incoming request bodies in a middleware before your handlers, available under the req.body property.
const express = require('express') // server
const morgan = require('morgan') // HTTP request logger middleware
const {sequelize} = require('./models')
const config = require('./config/config')

// initialize express
const app = express()

app.use(morgan('combined')) // when you will hit express endpoints it will log it in terminal
app.use(bodyParser.json())
app.use(cors())

// Endpoints
require('./endpoints/user')(app);
require('./endpoints/posts')(app);

sequelize.sync() //if pass an argument {force: true} to sync it will clear out whole database
    .then(() => {
        // start listening on some port - different from this on which vue is running
        app.listen(config.port)
    })
