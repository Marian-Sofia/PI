import { GET_GENRES, GET_VIDEOGAMES } from "./actions-types";

const initialState = {
    videogames: [],
    videogamesDetail: {},
    genres: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type){
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload
            }
        
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }
            
        default:
            return {...state}
    }
}

export default reducer;