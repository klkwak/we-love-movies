if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");

app.use(cors());
app.use(express.json());

app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
