import { useState } from "react";
import { checkIsAnswered } from "../utils/helper";
import ListQuestions from "./ListQuestions";
import Nav from "./Nav";
import { connect } from "react-redux";

function Dashboard({ newQuestionIds, doneQuestionIds }) {
  const [activeTab, setActiveTab] = useState("unanswered");

  const renderTab = (tab, label) => {
    if (activeTab === tab) {
      return (
        <button className="py-3 text-center bg-green-500 rounded-t text-white font-bold text-lg border-b-[1px]">
          {label}
        </button>
      );
    }

    return (
      <button
        onClick={() => setActiveTab(tab)}
        className="py-3 text-center rounded-t text-black font-bold text-lg border-b-[1px] hover:border-b-[2px] hover:border-black"
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <Nav currentActive="home" />
      <div className="flex-auto grid grid-cols-2 mt-6 mx-2">
        {renderTab("unanswered", "New Question")}
        {renderTab("answered", "Done")}
      </div>
      {activeTab === "unanswered" && (
        <ListQuestions title="New Questions" questionIds={newQuestionIds} />
      )}
      {activeTab === "answered" && (
        <ListQuestions title="Done" questionIds={doneQuestionIds} />
      )}
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
