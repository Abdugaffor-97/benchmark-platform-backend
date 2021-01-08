const express = require("express");
const { getQuestions } = require("../../fsUtilities");
const shuffleArray = require("../../helperFunctons");
const uniqid = require("uniqid");

const questionsRouter = express.Router();

questionsRouter.get("/", async (req, res, next) => {
  try {
    const questions = await getQuestions();
    res.send(questions);
  } catch (error) {
    next(error);
  }
});

module.exports = questionsRouter;
