const { Router } = require('express');
const {routerVideogame}= require("./videogameroutes")

const{genresRouter}=require("./genersrouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use( '/games', routerVideogame )
router.use( '/genres', genresRouter )

module.exports = router;
