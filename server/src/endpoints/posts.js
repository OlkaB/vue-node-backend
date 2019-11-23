const { Posts } = require('../models')
const config = require('../config/config')

module.exports = (app) => {

    // get all posts
    app.get('/posts', async (req, res) => {
        try {
            const posts = await Posts.findAll(
                // {
                    // limit: 10, // returns all 10 first items
                // }
            )

            res.send(posts)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    // get all user's posts
    app.get('/posts/user/:userId', async (req, res) => {
        try {
            await Posts.findAll({
                where: {
                    id: req.params.userId
                }
            })

            res.send(posts)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    // get one post by id
    app.get('/posts/:postId', async (req, res) => {
        try {
            const post = await Posts.findById(req.params.postId)

            res.send(post)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    // add post
    app.post('/posts', async (req, res) => {
        try {
            await Posts.create(req.body)
            const posts = await Posts.findAll()
            res.send(posts)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })

    // update post
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

    // delete post
    app.delete('/posts/:postId', async (req, res) => {
        try {
            const postDeleted = await Posts.destroy({
                where: {
                    id: req.params.postId
                }
            })
            const posts = await Posts.findAll()
            res.send(posts)
        } catch ({ errors }) {
            res.status(400).send({ error: errors })
        }
    })
}