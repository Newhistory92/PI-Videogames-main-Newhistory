import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import SearchVideogame from '../../../components/SearchVideogames/SearchVideogame';
import { searchGames } from '../../../redux/actions';
import Pagination from '../../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import './Searchbar.css'

const Searchbar = () => { //realiza la búsqueda de juegos al cargar el componente.
    const dispatch = useDispatch();
    const { name } = useParams();

    useEffect(() => {
        dispatch( searchGames( name ) ) //La acción searchGames(name)se ejecuta cuando 
        //cambia el nombre en la URL ( name) o cuando el componente se monta
    },[dispatch, name])

    const games = useSelector( state => state.searchGames);

    // //                  Paginado
    const [ currentPage, setCurrentPage ] = useState( 1 );//Es un estado que representa la página actual que se está mostrando en la paginación.
    const [ gamesPerPage ] = useState( 15 );//Es una propiedad que define la cantidad de juegos que se muestran por página.

    const paginate = ( page ) => { //cambiar la página actual en la paginación.
        setCurrentPage( page );
    };

    const indexOfLastGame = currentPage * gamesPerPage; // Se calcula el índice del último juego y 
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;//el índice del primer juego que se muestra en la página actual.
    const currentGame = games.slice( indexOfFirstGame, indexOfLastGame );//Luego, se obtiene la sección de juegos actual utilizando sliceen función de los índices calculados.

    return (
        <div id="searchbar">
            <section className='resulGoHome'>
                <h1 className='results' > Results with {name}! </h1>
                <Link to={'/home'}>
                    <button className='goHomeS'> Go Home </button>
                </Link>
            </section>
            <SearchVideogame videogames={currentGame} />
            <Pagination 
                gamesPerPage={ gamesPerPage } 
                totalPosts={ Array.isArray( games ) ? games.length : 0 } 
                paginate={ paginate } 
                currentPage={ currentPage }
                setCurrentPage={ setCurrentPage }
            />
        </div>
    )
}

export default Searchbar