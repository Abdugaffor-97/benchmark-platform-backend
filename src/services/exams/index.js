const express = require("express");
const {
  getQuestions,
  writeCandidate,
  getCandidates,
} = require("../../fsUtilities");
const shuffleArray = require("../../helperFunctons");
const uniqid = require("uniqid");

const examsRouter = express.Router();

examsRouter.post("/start", async (req, res, next) => {
  try {
    const qeuestions = await getQuestions();
    const randQuestions = shuffleArray(qeuestions, 5);

    let candidate = req.body;
    candidate = {
      ...candidate,
      _id: uniqid(),
      examDate: new Date(),
      questions: randQuestions,
    };

    const candidates = await getCandidates();
    candidates.push(candidate);
    await writeCandidate(candidates);

    res.send(candidate);
  } catch (error) {
    next(error);
  }
});

module.exports = examsRouter;
