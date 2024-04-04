import { connect } from "react-redux";
import Question from "./Question";

function ListQuestions({ questionIds }) {
  return (
    <div className="mx-2 border-[1px] border-t-0 rounded h-full">
      <div className="p-3 grid grid-cols-3 gap-3">
        {questionIds.map((id) => (
          <Question key={id} id={id} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ListQuestions);
