import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/shared/NavBar";
import Question from "./components/question/Question";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export default function App() {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="" element={<p>Home</p>} />
                <Route path="/vragen" element={<p>Vragen</p>} />
                <Route path="/vragen/:id" element={<Question />} />
                <Route path="/leaderbord" element={<p>Leaderbord</p>} />
                <Route path="/inloggen" element={<Login />} />
                <Route path="/registreren" element={<Register />} />

                <Route path="*" element={<p>404 not found</p>} />
            </Routes>
        </>
    );
}
