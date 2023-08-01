import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../pages/Loader/Loader';
import { getGames } from '../../redux/actions';
import Pagination from '../Pagination/Pagination';
import Card from './Card/Card';
import './Cards.css';

function Cards({ currentPage, setCurrentPage, gamesPerPage, indexOfFirstGame, indexOfLastGame }) {
    const dispatch = useDispatch();
    //utilizo useSelector para acceder al estado de Redux y obtener los datos de los juegos almacenados en 
    //state.games y asignarlos a la variable games.
    
    const games = useSelector(state => state.games);
    
    useEffect( () => {
        dispatch( getGames() );
    }, [ dispatch ]);
    //El componente utiliza useEffect para realizar la acción de obtener los juegos ( getGames) cuando el componente se monta y El hook useDispatchse utiliza para obtener la función dispatch, que se utiliza para enviar la acción getGames()al store de Redux.


    // //                  Paginado
    // Devuelve una copia de una parte de los datos guardados en el estado
    const currentGame = games.slice( indexOfFirstGame, indexOfLastGame );
    //la función slice para obtener una copia de una porción de los datos de los juegos. La porción se determina a partir de las propiedades indexOfFirstGamey indexOfLastGame.
    const paginate = ( page ) => {
        setCurrentPage( page );
    };
    //La función paginate se define para actualizar el estado de currentPage con el número de página seleccionada.

    // Cards
    const cards = () => {
        return (
            currentGame.map( ( game, i ) => (
                    <Card 
                        games = { game }
                        key = { i }
                    /> 
            ))
        );
    };
    
    //  Renderiza 
    return(
        <div className='Cards_component'>
            <div className='Cards'>
                { 
                    games.includes( 'Not found' ) 
                        ? <div className="notFoundGames"> { games } </div>   //si el estado de games contiene la cadena 'Not found'.se muestra un mensaje de "Not found"
                        //Si gamesno está vacío y no contiene la cadena 'Not found', se muestra el componente Loader
                        : games.length !== 0 ? cards() : <Loader/>
                }
                
            </div>
            <Pagination 
                gamesPerPage={ gamesPerPage } 
                totalPosts={ Array.isArray( games ) ? games.length : 0 } 
                paginate={ paginate } 
                currentPage={ currentPage }
                setCurrentPage={ setCurrentPage }
            />
        </div>
    );
};
//se muestra las propiedades para configurar la paginación, como el número de juegos por página ( gamesPerPage), el total de juegos ( totalPosts), la función paginate, y las propiedades currentPage y setCurrentPage para manejar el estado de la página actual.

export default Cards;