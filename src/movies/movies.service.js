const knex = require("../db/connection");

const tableName = "movies";

function list() {
  return knex(tableName).select("*");
}

function getActiveMovies() {
  return knex(tableName)
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing": true })
    .groupBy("movies.movie_id");
}

function read(movie_id) {
  return knex(tableName).where({ movie_id }).first();
}

module.exports = {
  list,
  getActiveMovies,
  read,
};
