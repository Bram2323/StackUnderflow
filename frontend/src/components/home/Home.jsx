import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionList from "../shared/question-list/QuestionList.jsx";
import ApiService from "../../services/ApiService";
import { useEffect } from "react";
import UserService from "../../services/UserService";

function Home() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    if (!UserService.isLoggedIn()) {
    }

    useEffect(() => {
        ApiService.get("questions/own").then((response) =>
            setQuestions(response.data)
        );
    }, []);

    return (
        <>
            {UserService.isLoggedIn() ? (
                <div className="flex flex-col w-3/4">
                    <div className="flex items-baseline justify-between gap-10 mt-12">
                        <h1 className="font-bold text-center ">Mijn vragen</h1>
                        <button
                            className="bg-blue-500 text-white rounded-full px-5 py-3 transition duration-200 my-2 hover:bg-blue-700"
                            onClick={() => navigate("/vragen/aanmaken")}
                        >
                            Stel Vraag
                        </button>
                    </div>
                    <QuestionList questions={questions} />
                </div>
            ) : (
                <h1>Welkom bij Stack Underflow</h1>
            )}
        </>
    );
}

export default Home;
