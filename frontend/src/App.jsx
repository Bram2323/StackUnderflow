import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/shared/nav-bar/NavBar";
import Question from "./components/question/Question";
import Login from "./components/login/Login";
import QuestionOverview from "./components/question-overview/QuestionOverview";
import QuestionForm from "./components/question-form/QuestionForm";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import NotFoundPage from "./components/not-found-page/NotFoundPage";

export default function App() {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/vragen" element={<QuestionOverview />} />
                <Route path="/vragen/:id" element={<Question />} />
                <Route path="/leaderbord" element={<p>Leaderbord</p>} />
                <Route path="/inloggen" element={<Login />} />
                <Route path="/registreren" element={<Register />} />
                <Route path="/vragen/aanmaken" element={<QuestionForm />} />
                <Route path="/vragen/:id/bewerken" element={<QuestionForm />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}
