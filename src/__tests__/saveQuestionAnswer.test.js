import { _getQuestions, _saveQuestionAnswer } from "../utils/_DATA";

describe("saveQuestionAnswer", () => {
  it("will return saved question answer if new answer is passed", async () => {
    var info = {
      authedUser: "tylermcginnis",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };
    await _saveQuestionAnswer(info);
    var questions = await _getQuestions();

    expect(questions["8xf0y6ziyjabvozdd253nd"].optionTwo.votes).toContain(
      "tylermcginnis"
    );
  });

  it("will return an error if incorrect data is passed", async () => {
    var info = {};

    await expect(_saveQuestionAnswer(info)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
