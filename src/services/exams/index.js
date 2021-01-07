const express = require("express");
const { getQuestions } = require("../../fsUtilities");

const examsRouter = express.Router();

examsRouter.post("/start", async (req, res, next) => {
  try {
    const qeuestions = await getQuestions();
    console.log(qeuestions);
    res.send("start");
  } catch (error) {
    next(error);
  }
});

module.exports = examsRouter;
