import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import { Link } from "react-router-dom";

function Question({ question, id }) {
  return (
    <div className="p-3 flex flex-col gap-6 border-[1px] rounded">
      <div className="text-center">
        <h6 className="font-bold">{question.author}</h6>
        <div className="text-sm text-gray-400">
          {formatDate(question.timestamp)}
        </div>
      </div>
      <Link
        to={`/questions/${id}`}
        className="text-center border-[1px] py-1 rounded border-green-500 text-green-500 text-sm hover:bg-green-500 hover:text-white"
      >
        Show
      </Link>
    </div>
  );
}

const mapStateToProps = ({ questions }, { id }) => ({
  question: questions[id],
});

export default connect(mapStateToProps)(Question);
