const deleteVideogamesRouter = require('express').Router()
const { deleteVideogames } = require('../../controllers/controllers')

deleteVideogamesRouter
.delete('/:id', async ( req, res) => {
    try {
        const { id } = req.params;
        await deleteVideogames(id)

        return res.status(200).json('The game has been deleted successfully')
        
    } catch ({ message }) {
        return res.status(404).send(message)
    }
})

module.exports = deleteVideogamesRouter