const{getGenresRoutes,getGenreRoutes,apiGenresRoutes,createGenreRoutes,PutGenreRoutes}=require("../videoandgenersRoutes/Geners.js")

const genresRouter = Router()

// Gets
genresRouter.get( '/', getGenresRoutes );
genresRouter.get("/:id", getGenreRoutes );

// Post 
genresRouter.post( '/api', apiGenresRoutes );
genresRouter.post( '/', createGenreRoutes );


// Put
genresRouter.put( '/:id', PutGenreRoutes );

module.exports = genresRouter;