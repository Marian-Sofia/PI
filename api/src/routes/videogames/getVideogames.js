const { 
    getVideogames, 
    getVideogamesById, 
    getVideogamesByName,
} = require('../../controllers/controllers')
const {Videogames, Genres} = require('../../db')
const getVideogamesRouter = require('express').Router()


getVideogamesRouter

.get('/', async (req, res) => {
    try {
        const { name } = req.query
        
        if(name){
            const dataName = await getVideogamesByName(name)
            return res.status(200).json(dataName)
        }
        
        let dataDB = await Videogames.findAll({
            include: {
                model: Genres,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }
        })
        const dataApi = await getVideogames()

        return res.status(200).json([...dataDB, ...dataApi])
    }
    catch ({message}) {
        return res.status(404).json(message)

    }
})

.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const source = isNaN(id) ? 'db' : 'api';

        const data = await getVideogamesById(id, source)
        return res.status(200).json(data)
    
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = getVideogamesRouter;