import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Navigation";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import LeaderboardPage from "./LeaderboardPage";
import NewPollPage from "./NewPollPage";

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
