import Nav from "./Nav";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkIsAnswered } from "../utils/helper";
import Option from "./Option";
import Error from "./Error";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

function QuestionPage({ question, user, authedUser }) {
  if (question && user) {
    const { id, avatarURL } = user;
    const isAnswered = checkIsAnswered(question, authedUser);

    return (
      <div>
        <Nav />
        <div className="w-full my-6 flex flex-col items-center gap-4">
          <h3 className="font-bold text-xl">Poll by {id}</h3>
          <img src={avatarURL} alt="avatar" className="w-[20%] h-[20%]" />
          {!isAnswered && (
            <h2 className="font-bold text-2xl">Would You Rather</h2>
          )}
          <section className="w-[70%] grid grid-cols-2 gap-4">
            <Option answer="optionOne" question={question} />
            <Option answer="optionTwo" question={question} />
          </section>
        </div>
      </div>
    );
  }

  return <Error />;
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { questionId } = props.router.params;

  return {
    question: questions[questionId],
    user: users[questions[questionId]?.author],
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
