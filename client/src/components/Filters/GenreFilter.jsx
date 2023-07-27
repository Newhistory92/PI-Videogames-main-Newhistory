import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGenres, filterGenre } from '../../redux/actions'
import './Css/Filter.css'

function GenreFilter({ setCurrentPage }) {
    const dispatch = useDispatch();
    const genres = useSelector( state => state.genresFilter )
    
    useEffect(() => {
        dispatch( getGenres() )
    },[ dispatch ]);
    // se utiliza useSelector para acceder al estado de Redux y obtener los géneros almacenados en 
    //state.genresFilter y  dispatch, se utiliza para enviar la acción getGenres()al store de Redux.
    const handleSelect =  ( evento ) => {
        const value = evento.target.value;
        setCurrentPage( 1 );
        dispatch( filterGenre( value ));
    };
//Cuando el usuario selecciona una opción del filtro, se activa el evento 
//La función handleSelectse ejecuta y toma el valor seleccionado ( evento.target.value), que es el género seleccionado por el usuario y luego, se actualiza el estado de la página actual a la primera
// se envía la acción filterGenre(value)con el valor del género seleccionado como argumento.
    return (
        <form id="genreFilter">
            <select className='genreFilters' onChange={ handleSelect } defaultValue={'DEFAULT'}>
                <option className='genreOptions' value="DEFAULT" disabled> Genre </option>
                {
                    genres.map(( genre, i ) => {
                        return(
                            <option className='genreOptions' value={ genre.name } key={ i } > { genre.name } </option>
                        )
                    })    
                }
            </select>
            <button className='btnReset' type='reset' onClick={ handleSelect } value="All"> X </button>
        </form>
    )
}

export default GenreFilter