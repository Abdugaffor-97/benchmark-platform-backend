const express = require("express");
const listEndpoints = require("express-list-endpoints");
const examsRoutes = require("./services/exams");
const questionRoutes = require("./services/exams");

const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers");

const server = express();

const port = process.env.PORT || 3001;

server.use(express.json());

server.use("/exams", examsRoutes);
server.use("/questions", questionRoutes);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Running on cloud on port", port);
  } else {
    console.log(`Running locally on port http://localhost:${port}`);
  }
});
