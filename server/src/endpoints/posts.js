const { Posts } = require('../models')
const config = require('../config/config')

module.exports = (app) => {

    app.get('/posts', async (req, res) => {
        try {
            const posts = await Posts.findAll({
                limit: 10, // returns all 10 first items
            })

            res.send(posts)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    app.get('/posts/:postId', async (req, res) => {
        try {
            const post = await Posts.findById(req.params.postId)

            res.send(post)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    app.post('/posts', async (req, res) => {
        try {
            const post = await Posts.create(req.body)
            res.send(post)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    app.patch('/posts/:postId', async (req, res) => {
        try {
            await Posts.update({...req.body.data}, {
                where: {
                    id: req.params.postId
                }
            })

            const post = await Posts.findByPk(req.params.postId)

            res.send(post)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })
}