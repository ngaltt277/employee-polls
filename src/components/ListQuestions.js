import { connect } from "react-redux";
import Question from "./Question";

function ListQuestions({ title, questionIds }) {
  return (
    <div className="m-2 border-[1px] rounded h-full">
      <h3 className="py-3 text-center bg-green-500 rounded-t text-white font-bold text-lg border-b-[1px]">
        {title}
      </h3>
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
