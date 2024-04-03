import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ authedUser, children }) {
  const location = useLocation();

  if (authedUser) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(ProtectedRoute);
