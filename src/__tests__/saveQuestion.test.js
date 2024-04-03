import { _saveQuestion } from "../utils/_DATA";

describe("saveQuestion", () => {
  it("will return saved question if new question is passed", async () => {
    var question = {
      optionOneText: "pepsi",
      optionTwoText: "coca",
      author: "tylermcginnis",
    };
    var result = await _saveQuestion(question);

    expect(result.optionOne.text).toEqual("pepsi");
    expect(result.optionTwo.text).toEqual("coca");
    expect(result.author).toEqual("tylermcginnis");
  });

  it("will return an error if incorrect data is passed", async () => {
    var question = {};

    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
