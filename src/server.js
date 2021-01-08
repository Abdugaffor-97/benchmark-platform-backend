const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const examsRoutes = require("./services/exams");
const questionRoutes = require("./services/questions");

const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers");

const server = express();

const port = process.env.PORT || 3001;

server.use(express.json());

const whiteList = [process.env.FE_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      // allowed
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED - CORS ISSUES"));
    }
  },
};

// server.use(cors(corsOptions));

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
