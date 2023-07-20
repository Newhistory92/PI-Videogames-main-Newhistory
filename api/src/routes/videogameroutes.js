
const { Router } = require("express");
const{getGamesroutes,getGameroutes,createGameroutes,putGameroutes}=require ("../videoandgenersRoutes/Videogame.js")




const routerVideogame = Router();


// Gets
routerVideogame.get("/",getGamesroutes);
routerVideogame.get("/:id",getGameroutes)

//Post
routerVideogame.post("/",createGameroutes)

//Put
routerVideogame.put('/:id',putGameroutes)



module.exports = routerVideogame;