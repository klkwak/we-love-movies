const knex = require("../db/connection");

const tableName = "theaters";

async function readTheater(theater_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("m.*", "mt.theater_id", "mt.is_showing")
    .where({ "mt.theater_id": theater_id });
}

async function setMovies(theater) {
  theater.movies = await readTheater(theater.theater_id);
  return theater;
}

async function list() {
  return knex(tableName)
    .select("*")
    .then((theaters) => Promise.all(theaters.map(setMovies)));
}

async function read(movie_id) {
  return knex(tableName)
    .join("movies_theaters as mt", "theaters.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("theaters.*")
    .where({ "m.movie_id": movie_id })
    .groupBy("theaters.theater_id");
}

module.exports = {
  list,
  read,
};
