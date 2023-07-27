import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { deleteGame, getDetails } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './Detail.css'

const Detail = () => {
    const { id } = useParams();//useParams:se utiliza para obtener el parámetro id del juego específico que se muestra en la página de detalles.
    const dispatch = useDispatch();
    const detail = useSelector( state => state.detailGame.id == id ? state.detailGame : [] );
    //accedemos al estado de Redux y obtener los detalles del juego específico. La variable detail contiene los detalles del juego con el mismo id obtenido de useParams.
    useEffect( () => {
        dispatch( getDetails( id ))
    }),//[ dispatch, id ])   
    
    function description() {
        if(detail.length !== 0 ) document.getElementById("description").innerHTML = detail.description.replaceAll("\n", "<br>")
    }
    //muestra la descripción del juego en formato HTML,inserta el contenido en el elemento con el id descriptionen el DOM.

    const platforms = ( platforms ) => {
        if( platforms ) return platforms.join(", ")
    }
    
    const genres = ( genres ) => {
        if( genres ) return Object.values( genres.map( genre => genre.name ).join(", "))
    }
    //Son funciones auxiliares que forman la información de las plataformas y géneros del juego
    
    function handlerDelete() {
        if( window.confirm("Are your sure?") === true ) {
            dispatch( deleteGame( id ) )
            alert( "The game has been eliminated" )
            window.location.href="/home"
        }
    };
    //Es una función que se ejecuta cuando el usuario hace clic en el botón "Eliminar".
    // Muestra una ventana de confirmación ( window.confirm) y si el usuario acepta,
// se ejecuta la acción deleteGame(id)para eliminar el juego con el idactual.
//Después de eliminar el juego, se muestra una alerta y se redirige al usuario a la página de inicio 
    return (
        <div id="details">
            <Link to={'/home'}>
                <button className='goHome'> Go Home </button>
            </Link>
            <h1 className="detailName"> {detail.name} </h1>
            <img className='detailImg' src={ detail.image } alt={detail.name} />
            <h1 className="detailAbout"> About </h1>
            <div id="description">{description()}</div>
            <div className='moreInfo' >
                <section className='sections' >
                    <h3 className='Subtitle'> Platforms </h3>
                    <h1 className="detailPlatform"> { platforms( detail.parent_platforms ) } </h1>
                </section>
                <section className='sections' >
                    <h3 className='Subtitle'> Relase date </h3>
                    <h1 className="detailDate"> { detail.releaseDate } </h1>
                </section>
                <section className='sections' >
                    <h3 className='Subtitle'> Raiting </h3>
                    <button value={Math.round(detail.rating)} className="detailRaiting"> { detail.rating } </button>
                </section>
                <section className='sections' >
                    <h3 className='Subtitle'> Genres </h3>
                    <h1 className="detailGenres"> { genres( detail.genres) } </h1>
                </section>
            </div>
            { 
                detail.length === 0 ? 
                    <Link to={ "/home" }> <div className="notFound"> Game Not Found </div> </Link> 
                        : detail.created === true ? 
                            <div className="buttons">
                                <Link to={`/updategame/${ id }`}>
                                    <button className='btns'> Edit </button>
                                </Link>
                                <button id='btnDelete' className='btns' onClick={ handlerDelete } > Delete </button>
                            </div>  
                            : <p style={{display:'none'}}/> 
            }
        </div>
    )
}

export default Detail