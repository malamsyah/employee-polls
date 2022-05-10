import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navigation";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import HomePage from "../components/HomePage";
import LeaderboardPage from "../components/LeaderboardPage";
import NewPollPage from "../components/NewPollPage";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/new" element={<NewPollPage />} />
        <Route path="/logout" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
