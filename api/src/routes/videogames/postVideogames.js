const postVideogamesRouter = require('express').Router()
const { postVideogames } = require('../../controllers/controllers')


postVideogamesRouter

.post('/', async ( req, res ) => {
    try {
        const { name, description, platform, image, date, rating, genre } = req.body
        await postVideogames( name, description, platform, image, date, rating, genre)

        return res.status(200).send('The game was created successfully')
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = postVideogamesRouter;