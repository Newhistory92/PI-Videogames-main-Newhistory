require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame } = require(`../db.js`);
const { Op } = require("sequelize");
const { apiAllCleaner, apiIdCleaner } = require ("./util/utilsApiGames.js")


// Gets
const getAllGames = async () => {
  // Variables 
  let api = `https://api.rawg.io/api/games?key=${API_KEY}`;
  let apiGames = [];
  // BD
  const bdGames = await Videogame.findAll({
    include: {
        model: Genre,
        as: 'genres', 
        attributes: [ "id","name" ],
             // y de la tabla intermedia.....
        through: {  attributes: []},
        order: [
                ['ASC']
            ],
    },
});
// Api
for (let i = 1; i <= 5; i++) { 
  const dataApi = ( await axios.get( api )).data;    
  
  // Filtra los datos de la api para traerlos con el formato de la Db
  const apiG = apiAllCleaner(dataApi);
  
  // Concatena los datos en el array
  apiGames = apiGames.concat(apiG);
  
  // Cambia el valor de la URL por el URL de la pagina siguiente
  api = dataApi.next;
}
// Concatena los datos de la api y de la Db
return [ ...bdGames, ...apiGames ];
}


const getGameById = async ( id, fuente) => {
  const { id } = req.params;
  // Url
  const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
 
  
  if(fuente === "api") {
      const dataApi = ( await axios.get( url )).data;
      const apiGames = apiIdCleaner(dataApi);
      return apiGames;
  } else {
      const response = await Videogame.findByPk(id, {
          include: {
              model: Genre,
              as: 'genres', 
              attributes: [ "id","name" ],
              through: {
                  attributes: [],
              },
              order: [
                  ['ASC']
              ],
          },
      });
      if( !response ) throw Error( `not exist` );
      return response;
  };
};



const getGamesByName = async (req, res) => {
    const { name } = req.query;
    const url = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`;

 // BD
 const bdGame = await Videogame.findAll({
  where: {
      name: { [Op.iLike]: `%${name}%` }
  },
  include: {
      model: Genre,
      as: 'genres', 
      attributes: [ "id","name" ],
      through: {
          attributes: [],
      },
      order: [
          ['ASC']
      ],
  },
});

// Api
const dataApi = ( await axios.get( url )).data;
const apiGames = apiAllCleaner(dataApi);

const response = [ ...bdGame, ...apiGames ];

if( !response.length ){
  throw Error( `${name} does not exist in the databases` );
}  
return response ;
};

module.exports ={
  getAllGames,
  getGamesByName,
  getGameById,
};











