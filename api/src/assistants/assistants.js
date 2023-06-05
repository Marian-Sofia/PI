const cleanGame = (game) => {
    const gameClean = {
        id: game.id,
        name: game.name, 
        description: game.description,
        platforms: game.platforms.map( plat => plat.platform.name),
        image: game.background_image,  
        date: game.released,
        rating: game.rating,
        genres: game.genres.map( gen => { 
            return {name: gen.name.toLowerCase()}
        })
    }

    return gameClean
}

const cleanApi = (api) => api ? api.map( game => cleanGame(game)) : [];

module.exports = {
    cleanApi,
    cleanGame,
}