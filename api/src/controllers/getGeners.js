const axios = require('axios');
const { Genre } = require('../db.js');
const { Op } = require('sequelize');
const { apiGenresCleaner } = require("./util/utilsApiGames.js")
require('dotenv').config();
const { API_KEY } = process.env;

// Posts
const apiGenres = async () => {
  const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
  return await axios
      .get( url )
      .then( dataApi =>  apiGenresCleaner(dataApi.data) )
      .then( genres =>  {
          genres.forEach( genreName => {
              createGenres({ name: genreName });
          });
          return 'Temperaments of the Api saved in BD';
      });
};
const createGenres = async ( name ) => {
  const newGenre = await Genre.create( name );
  return newGenre;
};

//Get

const getAllGenres = async () => {
  const getGenres = await Genre.findAll();
  if( !getGenres.length ) throw Error( 'The database is empty' );  
  return getGenres ;
}

const getGenresByName = async ( name ) => {
  const getGenres = await Genre.findAll({
      where: {
          name: { [Op.iLike]: `%${name}%` }
      }
  });
  if( !getGenres.length ) throw Error( 'This genre is not in the database' );
  return getGenres ;
}
const getGenreById = async ( id ) => {
  const getGenres = await Genre.findByPk( id );
  if( !getGenres ) throw Error( `The id: ${id} does not exist` );
  return getGenres ;

  
}
// Put
const updateGenre = async ( id, name ) => {
  const genre = await Genre.findByPk( id );
  if( !genre ) throw Error( `The id: ${id} does not exist` );
  if ( !name  ) throw Error('Missing Data');
  await Genre.update(
      { name},
      {
          where: { id }
      }
  )
  return `${name} has been updated`;
};

module.exports={
  apiGenres,
  getAllGenres,
  createGenres,
  getGenreById,
  getGenresByName,
  updateGenre
};
