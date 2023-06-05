const { API, API_KEY } = require('dotenv').config().parsed;
const {Videogames, Genres} = require('../db')
const { Op } = require('sequelize')
const { cleanApi, cleanGame } = require('../assistants/assistants')

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//                        CRUD VIDEOGAMES

//  GET VIDEOGAMES
let gamesData = []
let genresData = []
    
const getVideogames = async () => {

    for (let i = 1; i <= 5; i++) {
        const res = await fetch(`${API}games?key=${API_KEY}&page=${i}`)
        const { results } = await res.json()
        const dataApi = cleanApi(results)
        gamesData = [...gamesData, ...dataApi]
    }
    if(!gamesData) throw Error('There was an error with the request');

    return gamesData
}

const getVideogamesByName = async (name) => {
    const dataDB = await Videogames.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    dataDB.length >= 1 ? dataDB.slice(15) : [] 
    if(dataDB.length === 15) return dataDB;
    console.log(dataDB)

    const response = await fetch(`${API}games?key=${API_KEY}&search=${name}`)
    const { results } = await response.json()
    const dataApi = cleanApi(results)
    const data = [...dataDB, ...dataApi].slice(0, 15)

    if(!data) throw Error('The game was not found')

    return data
}

const getVideogamesById = async (id, source) => {
    if( source === 'api') {
        const response = await fetch(`${API}games/${id}?key=${API_KEY}`)
        const results = await response.json()
        const resultsData = cleanGame(results)

        if(resultsData.detail) throw Error('Id searched was not found')
        return resultsData
    }
    else{
        const dataDB = await Videogames.findOne({
            where: {id},
            include:{
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        if(!dataDB) throw Error('Id searched was not found')
        return dataDB
    }


}


//  POST VIDEOGAMES
const postVideogames = async ( name, description, platform, image, date, rating, genre ) => {

    if(!name) throw Error('There are mandatory fields not completed')
    

    const newVideogame = await Videogames.create({
        name: name,
        description: description,
        platform: platform,
        image: image,
        date: date,
        rating: rating,
        genre: genre
    })

    const genresfind = await Genres.findAll({
        where: {
            name: genre
        }
    })

    await newVideogame.addGenre(genresfind)

    return
}

//  PUT VIDEOGAMES
const putVideogames = async ( id, name, description, platform, image, date, rating, genre ) => {
    const videogameId = await getVideogamesById(id)

    videogameId.name = name || videogameId.name,
    videogameId.description = description || videogameId.description,
    videogameId.platform = platform || videogameId.platform, 
    videogameId.image = image || videogameId.image, 
    videogameId.date = date || videogameId.date, 
    videogameId.rating = rating || videogameId.rating,
    videogameId.genre = genre || videogameId.genre

    return 
}

//  DELETE VIDEOGAMES
const deleteVideogames = async (id) => {
    const videogameId = await Videogames.destroy({
        where:{ id }
    })

    return 
}


//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//
//                             GENRES

//  GET GENRES
const getGenres = async () => {

    if(genresData.length > 1) return

    const response = await fetch(`${API}genres?key=${API_KEY}`)
    const {results} = await response.json()

    genresData = await results.map( genre => 
        Genres.create({name: genre.name.toLowerCase()})
    )

    return Promise.all(genresData)
}

module.exports = {
    getVideogames,
    getVideogamesById,
    getVideogamesByName,
    postVideogames,
    getGenres,
    putVideogames,
    deleteVideogames
}

