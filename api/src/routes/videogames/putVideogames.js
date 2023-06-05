const { putVideogames } = require('../../controllers/controllers')
const putVideogamesRouter = require('express').Router()

putVideogamesRouter
.put('/', async ( req, res ) => {
    try {
        const { id, name, description, platform, image, date, rating, genre } = req.body 
        if(!id) throw Error('The ID is required')

        await putVideogames(id, name, description, platform, image, date, rating, genre)


        return res.status(200).send('The game has been updated')
    
    } catch ({ message }) {
        return res.status(404).send(message)
    }
})

module.exports = putVideogamesRouter