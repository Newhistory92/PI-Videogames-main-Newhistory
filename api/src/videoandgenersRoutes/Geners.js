const {apiGenres,
    getAllGenres,
    createGenres,
    getGenreById,
    getGenresByName,updateGenre}= require ("../controllers/getGeners")


    // Gets
const getGenresRoutes = async ( req, res ) => {
    const { name } = req.query
    try {
        const response = name ? await getGenresByName( name ) : await getAllGenres();
        res.status( 200 ).json( response );
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
const getGenreRoutes = async ( req, res ) => {
    const { id } = req.params;
    try {
        const response = await getGenreById( id );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Posts
const apiGenresRoutes = async (  req, res ) => {
    try {
        const Genres = await apiGenres();
        res.status( 201 ).json( Genres );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const createGenreRoutes = async ( req, res ) => {
    const { name }  = req.body
    try {
        const response = await createGenres({ name })
        res.status( 201 ).json( response )
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Put
const PutGenreRoutes = async ( req, res ) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const response = await updateGenre( id, name )
        res.status( 200 ).json( response );
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports={getGenresRoutes,getGenreRoutes,apiGenresRoutes,createGenreRoutes,PutGenreRoutes}