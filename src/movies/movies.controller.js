const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  let data = await service.list();

  if (req.query.is_showing === "true") {
    data = await service.getActiveMovies();
  }

  res.json({ data });
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  next({ status: 404, message: "Movie cannot be found." });
}

function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
};
