import { getVideogames } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { CardVideogame } from '../../components';

const CardsContainer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogames())
    }, [])
    
    const games = useSelector(state => state.videogames)

    return (
        <div>
            {games.map( game => {
                return <CardVideogame
                    Key={game.id}
                    id={game.id}
                    name={game.name}
                />
            })}
            <h1>Cards Container</h1>
        </div>
    )
}



export default CardsContainer;