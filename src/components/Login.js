import { connect } from "react-redux";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ users, dispatch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = loginInfo;

    const user = users[username];

    if (!user || user.password !== password) {
      setError("Username or password is incorrect. Please try again!");
    } else {
      dispatch(setAuthedUser(username));
      setError("");
      setLoginInfo({ username: "", password: "" });

      const from = location.state.from || "/";
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="text-center mt-10">
        <h1 className="font-extrabold text-[32px]">Employee Polls</h1>
      </div>
      <form onSubmit={onSubmit} className="text-center space-y-3 w-[30%]">
        {error && (
          <div className="text-red-600 text-sm text-start" data-testid="error">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-2 text-start">
          <label className="font-medium" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            placeholder="Username"
            className="border-black border-solid border-[1px] rounded p-2 w-full"
            name="username"
            value={loginInfo.username}
            onChange={onChange}
            data-testid="username"
          />
        </div>
        <div className="flex flex-col gap-2 text-start">
          <label className="font-medium" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            className="border-black border-solid border-[1px] rounded p-2 w-full"
            name="password"
            value={loginInfo.password}
            onChange={onChange}
            data-testid="password"
          />
        </div>
        <button
          type="submit"
          disabled={!loginInfo.username || !loginInfo.password}
          data-testid="login-button"
          className="bg-green-700 px-4 py-2 text-white rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
