const express = require("express");
const {
  getQuestions,
  writeCandidate,
  getCandidates,
} = require("../../fsUtilities");
const shuffleArray = require("../../helperFunctons");
const uniqid = require("uniqid");

const examsRouter = express.Router();

examsRouter.post("/:id/answer", async (req, res, next) => {
  try {
    let candidates = await getCandidates();
    const candidate = candidates.find((cand) => cand._id === req.params.id);

    if (candidate) {
      candidates = candidates.filter((cand) => cand._id !== req.params.id);
      const providedAnswers = req.body;

      let score = 0;
      providedAnswers.forEach((pvAns) => {
        candidate.questions[pvAns.question].providedAnswer = pvAns.answer;
        console.log(
          candidate.questions[pvAns.question].answers.findIndex(
            (ans) => ans.isCorrect
          )
        );
        if (
          candidate.questions[pvAns.question].answers.findIndex(
            (ans) => ans.isCorrect
          ) === pvAns.answer
        ) {
          score += 1;
        }
      });
      candidate.score = score;

      candidates.push(candidate);
      await writeCandidate(candidates);
      // console.log(candidate.questions);
    } else {
      res.status(404).send("Not Found");
    }
    res.send(candidate);
  } catch (error) {
    next(error);
  }
});

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
