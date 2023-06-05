import axios from 'axios';
import { 
    GET_VIDEOGAMES, 
    // POST_VIDEOGAMES, 
    // PUT_VIDEOGAMES, 
    // DELETE_VIDEOGAMES, 
    // DETAIL_VIDEOGAMES, 
    GET_GENRES 
} from "./actions-types";

export const getVideogames = () => {
    return async function (dispatch) {
        const info = await axios('http://localhost:3001/videogames')
        dispatch({ type: GET_VIDEOGAMES, payload: info.data })
    }
}

export const getGenres = () => {
    return async (dispatch) => {
        const info = axios('http://localhost:3001/genres')
        dispatch({ type: GET_GENRES, payload: info.data })
    }
}