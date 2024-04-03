import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

function Nav({ user, currentActive, dispatch }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAuthedUser(null));

    navigate("/login");
  };

  const renderNavItem = (isActive, path, label) => {
    if (isActive) {
      return (
        <Link
          to={path}
          className="relative px-4 after:absolute after:border-[1px] after:border-black after:w-full after:right-0 after:bottom-[-12px]"
        >
          {label}
        </Link>
      );
    }

    return (
      <Link
        to={path}
        className="relative px-4 hover:after:absolute hover:after:border-[1px] hover:after:border-black hover:after:w-full hover:after:right-0 hover:after:bottom-[-12px]"
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="flex w-full justify-between items-end py-3 px-5 border-b-[1px]">
      <div className="flex gap-2">
        {renderNavItem(currentActive === "home", "/", "Home")}
        {renderNavItem(
          currentActive === "leaderboard",
          "/leaderboard",
          "Leaderboard"
        )}
        {renderNavItem(currentActive === "add", "/add", "New")}
      </div>
      <div className="flex gap-3 items-end">
        <div className="flex items-end gap-2">
          <img src={user.avatarURL} alt="avatar" className="w-8 h-8" />
          <span className="font-bold text-sm">{user.id}</span>
        </div>
        <button
          onClick={handleLogout}
          className="relative px-4 hover:after:absolute hover:after:border-[1px] hover:after:border-black hover:after:w-full hover:after:right-0 hover:after:bottom-[-12px]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ users, authedUser }) => ({
  user: users[authedUser],
});

export default connect(mapStateToProps)(Nav);
