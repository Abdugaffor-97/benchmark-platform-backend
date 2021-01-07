const express = require("express");
const { getQuestions } = require("../../fsUtilities");
const shuffleArray = require("../../helperFunctons");

const examsRouter = express.Router();

examsRouter.post("/start", async (req, res, next) => {
  try {
    const qeuestions = await getQuestions();
    randQuestions = shuffleArray(qeuestions, 5);
    console.log(randQuestions);
    res.send("start");
  } catch (error) {
    next(error);
  }
});

module.exports = examsRouter;
