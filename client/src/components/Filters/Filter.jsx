import React from 'react'
import OrderFilter from './OrderFilter';
import CreatedFilter from "./OriginFilter";
import PlatformFilter from './PlatformFilter';
import GenreFilter from './GenreFilter';
import './Css/Filter.css'

function Filter({ setCurrentPage }) {//esta propiedad se utiliza para actualizar el estado de la
    // página actual cuando se apliquen los filtros.
    return (
        <div id="Filtro">
                <div className="orderFilter">
                    <OrderFilter setCurrentPage={ setCurrentPage }/>
                </div>
                <div className="createdFilter">
                    <CreatedFilter setCurrentPage={ setCurrentPage }/>
                </div>
                <div className="platformFilter">
                    <PlatformFilter setCurrentPage={ setCurrentPage }/>
                </div>
                <div className="genreFilter">
                    <GenreFilter setCurrentPage={ setCurrentPage }/>
                </div>
        </div>
    )
}

export default Filter