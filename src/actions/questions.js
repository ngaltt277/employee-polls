import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const VOTE_QUESTION = "VOTE_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

function voteQuestion({ authedUser, qid, answer }) {
  return {
    type: VOTE_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleVoteQuestion(info) {
  return (dispatch) => {
    dispatch(voteQuestion(info));

    return saveQuestionAnswer(info).catch((e) => {
      alert(e);
      dispatch(voteQuestion(info));
    });
  };
}

function addQuestion(question, authedUser) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser,
  };
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => dispatch(addQuestion(question, authedUser)));
  };
}
