import { ADD_QUESTION, VOTE_QUESTION } from "../actions/questions";
import { GET_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case VOTE_QUESTION:
      const { qid, answer, authedUser } = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    case ADD_QUESTION:
      const { question, authedUser: userId } = action;

      return {
        ...state,
        [userId]: {
          ...state[userId],
          questions: [...state[userId].questions, question.id],
        },
      };
    default:
      return state;
  }
}
