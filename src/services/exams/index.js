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

      exam.questions[providedAnswer.question].providedAnswer =
        providedAnswer.answer;

      if (
        exam.questions[providedAnswer.question].answers.findIndex(
          (ans) => ans.isCorrect
        ) === providedAnswer.answer
      ) {
        console.log(exam.score);
        exam.score += 1;
      }

      exams.push(exam);
      await writeExams(exams);
      if (providedAnswer.question + 1 === exam.questions.length) {
        res.send({ questions: exam.questions, score: exam.score });
        console.log({ questions: exam.questions, score: exam.score });
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
      score: 0,
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
