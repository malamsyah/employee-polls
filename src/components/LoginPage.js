import { useState } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { handleLoginAction } from "../actions/authedUser";

const LoginPage = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password);

    dispatch(handleLoginAction(username, password));
  };

  return (
    <div className="auth-wrapper">
      <LoadingBar />
      <div className="auth-inner">
        <form onSubmit={handleLogin}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                const text = e.target.value;
                setUsername(text);
              }}
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                const text = e.target.value;
                setPassword(text);
              }}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(LoginPage);
