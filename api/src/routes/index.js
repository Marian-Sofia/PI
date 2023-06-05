const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getVideogames = require('../routes/videogames/getVideogames')
const postVideogames = require('../routes/videogames/postVideogames')
const putVideogames = require('../routes/videogames/putVideogames')
const getGenres = require('../routes/genres/getGenres')
const deleteVideogames = require('../routes/videogames/deleteVideogames')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//                  CRUD VIDEOGAMES

//GET VIDEOGAMES
router.use('/videogames', getVideogames)
//POST VIDEOGAMES
router.use('/videogames', postVideogames)
//PUT VIDEOGAMES
router.use('/videogames', putVideogames)
//DELETE VIDEOGAMES
router.use('/videogames', deleteVideogames)


//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//                      GENRES

//GET GENRES
router.use('/genres', getGenres)


module.exports = router;
