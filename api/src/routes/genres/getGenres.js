const genresRouter = require('express').Router();
const { Genres } = require('../../db')
const { getGenres } = require('../../controllers/controllers')

genresRouter
.get('/', async ( req, res) => {
    try {
        await getGenres()
        const data = await Genres.findAll()

        return res.status(200).json(data)
        
    } catch ({message}) {
        return res.status(404).send(message)
    }
})

module.exports = genresRouter