const { readJSON } = require("fs-extra");
const { join } = require("path");

const questionsPath = join(__dirname, "./services/exams/questions.json");

const readDB = async (filePath) => {
  try {
    const fileJSON = await readJSON(filePath);
    return fileJSON;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getQuestions: async () => readDB(questionsPath),
};
