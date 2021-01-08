const express = require("express");
const { getQuestions, getExams, writeExams } = require("../../fsUtilities");
const shuffleArray = require("../../helperFunctons");
const uniqid = require("uniqid");

const examsRouter = express.Router();

examsRouter.post("/:id/answer", async (req, res, next) => {
  try {
    let exams = await getExams();
    const exam = exams.find((cand) => cand._id === req.params.id);

    if (exam) {
      exams = exams.filter((cand) => cand._id !== req.params.id);
      const providedAnswers = req.body;

      let score = 0;
      providedAnswers.forEach((pvAns) => {
        exam.questions[pvAns.question].providedAnswer = pvAns.answer;
        console.log(
          exam.questions[pvAns.question].answers.findIndex(
            (ans) => ans.isCorrect
          )
        );
        if (
          exam.questions[pvAns.question].answers.findIndex(
            (ans) => ans.isCorrect
          ) === pvAns.answer
        ) {
          score += 1;
        }
      });
      exam.score = score;

      exams.push(exam);
      await writeExams(exams);
      // console.log(exam.questions);
    } else {
      res.status(404).send("Not Found");
    }
    res.send(exam);
  } catch (error) {
    next(error);
  }
});

examsRouter.post("/start", async (req, res, next) => {
  try {
    const qeuestions = await getQuestions();
    const randQuestions = shuffleArray(qeuestions, 5);

    let exam = req.body;
    exam = {
      ...exam,
      _id: uniqid(),
      examDate: new Date(),
      questions: randQuestions,
    };

    const exams = await getExams();
    exams.push(exam);
    await writeExams(exams);

    res.send(exam);
  } catch (error) {
    next(error);
  }
});

module.exports = examsRouter;
