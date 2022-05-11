import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import Navigation from "../components/Navigation";
import { handleInitialData } from "../actions/index";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import HomePage from "../components/HomePage";
import LeaderboardPage from "../components/LeaderboardPage";
import NewPollPage from "../components/NewPollPage";
import LoadingBar from "react-redux-loading-bar";

const App = (props) => {
  useEffect(() => {
    if (props.authedUser === null) {
      return;
    }

    props.dispatch(handleInitialData());
  }, [props, props.authedUser]);

  if (props.authedUser === null) {
    return <LoginPage />;
  }

  return (
    <div className="App">
      <Navigation />
      <LoadingBar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/new" element={<NewPollPage />} />
        <Route path="/logout" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
