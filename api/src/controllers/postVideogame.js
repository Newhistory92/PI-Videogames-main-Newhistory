const { Videogame} = require('../db.js');
const { Op } = require('sequelize');
const axios = require('axios');

const createGame = async ( name, description, image, releaseDate, rating, genres, parent_platforms ) => {
  // Crea el juego
  const newGame = await Videogame.create({ name, description, image, releaseDate, rating, parent_platforms });
  
  // Relacione videogames con genres
  await newGame.addGenre( genres);

  return newGame;
};
// Put
const updateGame = async ( id, name, description, image, releaseDate, rating, genres, parent_platforms ) => {
  // Comprueba si existe el Juego
  const game = await Videogame.findByPk( id );
  if( !game ) throw Error( `The id: ${id} does not exist` );

  // Comprueba si falta algun dato
  if ( !name || !description || !image || !releaseDate || !rating || !genres || !parent_platforms ) throw Error('Missing Data');

  // Actualiza la tabla de relaciones de generos
  await game.setGenres( genres );

  // Actualiza los datos
  await Videogame.update(
      { name, description, image, releaseDate, rating, parent_platforms },
      {
          where: { id }
      }
  )
  return `${name} has been updated`;
};
module.exports ={createGame,updateGame}