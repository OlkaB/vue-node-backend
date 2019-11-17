const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_MONTH = 60 * 60 * 24 * 7 * 30

    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: ONE_MONTH
    })
}

module.exports = (app) => {
    /* create an endpoint in express
    * choose method to listen to: get/post/put/patch/delete
    * as first argument pass endpoint name
    * inside define the reponse (res.send({message: {....} })) for the litened request
    * you can now open browser on listened port slash endpoint: localhost:8081/status
    **/
   app.post('/register', async (req, res) => {
        // to access request data, use: req.body.<propertyName>
        // res.send({
        //     data: `Registered user ${req.body.email}`
        // })

        try {
            // use data from sequelize db
            const user = await User.create(req.body)
            res.send({
                user: user.toJSON()
            })
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    app.post('/login', async (req, res) => {
        try {
            const {email, password} = req.body

            if ([null, ''].includes(email)) {
                return res.status(400).send({
                    error: [{
                        message: 'Email cannot be empty',
                        path: 'email'
                    }]
                })
            }

            if ([null, ''].includes(password)) {
                return res.status(400).send({
                    error: [{
                        message: 'Password cannot be empty',
                        path: 'password'
                    }]
                })
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                return res.status(403).send({ error: `User ${email} not found` })
            }

            const isPasswordValid = password === user.password
            if (!isPasswordValid) {
                return res.status(400).send({ error: 'Invalid password' })
            }

            const userJSON = user.toJSON()
            delete userJSON.password

            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
            })
        } catch ({ errors }) {
            res.status(500).send({ error: 'An error occured during login' })
        }
    })
}
