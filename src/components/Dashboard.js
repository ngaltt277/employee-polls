import { checkIsAnswered } from "../utils/helper";
import ListQuestions from "./ListQuestions";
import Nav from "./Nav";
import { connect } from "react-redux";

function Dashboard({ newQuestionIds, doneQuestionIds }) {
  return (
    <div className="h-full flex flex-col">
      <Nav currentActive="home" />
      <div className="flex-auto grid grid-cols-2 my-6 mx-4">
        <ListQuestions title="New Questions" questionIds={newQuestionIds} />
        <ListQuestions title="Done" questionIds={doneQuestionIds} />
      </div>
    </div>
  );
}

const mapStateToProps = ({ questions, authedUser }) => {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  return questionIds.reduce(
    (acc, id) => {
      if (checkIsAnswered(questions[id], authedUser)) {
        acc.doneQuestionIds.push(id);
      } else {
        acc.newQuestionIds.push(id);
      }
      return acc;
    },
    { newQuestionIds: [], doneQuestionIds: [] }
  );
};

export default connect(mapStateToProps)(Dashboard);
