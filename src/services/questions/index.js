const express = require("express");
const {
  getQuestions,
  writeCandidate,
  getCandidates,
} = require("../../fsUtilities");
const shuffleArray = require("../../helperFunctons");
const uniqid = require("uniqid");

const questionsRouter = express.Router();

module.exports = questionsRouter;
