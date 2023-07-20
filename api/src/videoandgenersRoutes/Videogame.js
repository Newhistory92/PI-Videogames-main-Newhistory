const {  getAllGames,
    getGamesByName,
    getGameById,}=require ("../controllers/getVideogame");
const{createGame,updateGame}=require("../controllers/postVideogame")


// Gets
const getGamesroutes = async ( req, res ) => {
    const { name } = req.query;
    try {
        const response = name ? await getGamesByName( name ) : await getAllGames();
        res.status(200).json( response );
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getGameroutes = async ( req, res ) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    try {
        const response = await getGameById( id, source );
        res.status(200).json( response );
    } catch (error) {
        res.status(404).json({ error: `The id: ${id} does not exist` });
    }
};
// Posts
const createGameroutes = async ( req, res ) => {
    const { name, description, image, releaseDate, rating, genres, parent_platforms } = req.body;
    try {
        const newGame = await createGame( name, description, image, releaseDate, rating, genres, parent_platforms );
        res.status(201).json( newGame );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Put
const putGameroutes = async ( req, res ) => {
    const { id } = req.params;
    const { name, description, image, releaseDate, rating, genres, parent_platforms } = req.body;
    try {
        const response = await updateGame( id, name, description, image, releaseDate, rating, genres, parent_platforms );
        res.status( 200 ).json( response );
    } catch (error) {
        res.status( 400 ).json({ error: error.message });
    }
};

module.exports ={getGamesroutes,getGameroutes,createGameroutes,putGameroutes};