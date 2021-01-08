const { readJSON, writeJSON } = require("fs-extra");
const { join } = require("path");

const questionsPath = join(__dirname, "./services/questions/questions.json");
const examsPath = join(__dirname, "./services/exams/exams.json");

const readDB = async (filePath) => {
  try {
    const fileJSON = await readJSON(filePath);
    return fileJSON;
  } catch (error) {
    throw new Error(error);
  }
};

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getQuestions: async () => readDB(questionsPath),
  writeExams: async (examInfo) => writeDB(examsPath, examInfo),
  getExams: async () => readDB(examsPath),
};
