import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/shared/nav-bar/NavBar";
import Question from "./components/question/Question";
import Login from "./components/login/Login";
import QuestionOverview from "./components/question-overview/QuestionOverview";
import QuestionForm from "./components/question-form/QuestionForm";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Leaderboard from "./components/leaderboard/Leaderboard";
import NotFoundPage from "./components/not-found-page/NotFoundPage";
import { history } from "./services/History";
import { useNavigate, useLocation } from "react-router-dom";
import UserPage from "./components/user-page/UserPage";

export default function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <>
            <NavBar />

            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/vragen" element={<QuestionOverview />} />
                <Route path="/vragen/:id" element={<Question />} />
                <Route path="/vragen/aanmaken" element={<QuestionForm />} />
                <Route path="/vragen/:id/bewerken" element={<QuestionForm />} />
                <Route path="/leaderbord" element={<Leaderboard />} />
                <Route path="/inloggen" element={<Login />} />
                <Route path="/registreren" element={<Register />} />
                <Route path="/gebruikers/:username" element={<UserPage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}
