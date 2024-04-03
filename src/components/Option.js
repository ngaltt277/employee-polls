import { connect } from "react-redux";
import { handleVoteQuestion } from "../actions/questions";
import { checkIsAnswered } from "../utils/helper";

function Option({ users, authedUser, answer, question, dispatch }) {
  const option = question[answer];
  const { text, votes } = option;

  const isSelectedOption = option.votes.includes(authedUser);
  const isAnswered = checkIsAnswered(question, authedUser);

  const handleVote = (e) => {
    e.preventDefault();

    dispatch(handleVoteQuestion({ authedUser, qid: question.id, answer }));
  };

  return (
    <div className="text-center">
      {isAnswered && isSelectedOption ? (
        <p className="border-[1px] py-2 text-sm bg-green-500 text-white">
          {text}
        </p>
      ) : (
        <p className="border-[1px] py-2 text-sm">{text}</p>
      )}
      {!isAnswered ? (
        <button
          className="bg-green-500 w-full py-1 font-semibold text-sm text-white"
          onClick={handleVote}
        >
          Click
        </button>
      ) : (
        <div
          data-testid={answer}
          className="border-[1px] border-t-0 py-1 font-semibold text-sm"
        >
          {votes.length} vote(s) (
          {(votes.length / Object.keys(users).length) * 100}%)
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    users,
    authedUser,
  };
};

export default connect(mapStateToProps)(Option);
