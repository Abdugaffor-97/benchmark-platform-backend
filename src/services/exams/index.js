const express = require("express");
const { getQuestions, getExams, writeExams } = require("../../fsUtilities");
const shuffleArray = require("../../helperFunctons");
const uniqid = require("uniqid");

const examsRouter = express.Router();

examsRouter.post("/:id/answer", async (req, res, next) => {
  try {
    const providedAnswer = req.body;
    let exams = await getExams();
    const exam = exams.find((cand) => cand._id === req.params.id);
    if (exam) {
      exams = exams.filter((cand) => cand._id !== req.params.id);

      let score = 0;
      exam.questions[providedAnswer.question].providedAnswer =
        providedAnswer.answer;

      if (
        exam.questions[providedAnswer.question].answers.findIndex(
          (ans) => ans.isCorrect
        ) === providedAnswer.answer
      ) {
        score += 1;
      }

      exam.score = score;

      exams.push(exam);
      await writeExams(exams);
      if (providedAnswer.question + 1 === exam.questions.length) {
        res.send({ questions: exam.questions, score: score });
        console.log({ questions: exam.questions, score: score });
      }
    } else {
      res.status(404).send("Not Found");
    }

    exam.questions.forEach((question) => {
      question.answers.forEach((ans) => {
        delete ans.isCorrect;
      });
    });
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

    exam.questions.forEach((question) => {
      question.answers.forEach((ans) => {
        delete ans.isCorrect;
      });
    });
    res.send(exam);
  } catch (error) {
    next(error);
  }
});

module.exports = examsRouter;
