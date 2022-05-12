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
import QuestionPage from "../components/QuestionPage";

const App = (props) => {
  useEffect(() => {
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
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/new" element={<NewPollPage />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};

export default connect(mapStateToProps)(App);
