import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionList from "../shared/question-list/QuestionList";
import ApiService from "../../services/ApiService";
import { useEffect } from "react";
import UserService from "../../services/UserService";
import { useSearchParams } from "react-router-dom";
import QuestionFilter from "../shared/question-filter/QuestionFilter";

function Home() {
    const [questions, setQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!UserService.isLoggedIn()) return;

        ApiService.get("questions/own", queryParams).then((response) => {
            setQuestions(response.data.content);
            setTotalPages(response.data.totalPages);
        });
    }, [queryParams]);

    return (
        <>
            {UserService.isLoggedIn() ? (
                <div className="flex flex-col w-3/5 gap-3">
                    <div className="flex items-baseline justify-between gap-10 mt-12">
                        <h1 className="font-bold text-center text-2xl">
                            Mijn vragen
                        </h1>
                        <button
                            className="bg-blue-500 text-white rounded-full px-5 py-3 transition duration-200 my-2 hover:bg-blue-700"
                            onClick={() => navigate("/vragen/aanmaken")}
                        >
                            Stel Vraag
                        </button>
                    </div>
                    <QuestionFilter />
                    <QuestionList
                        questions={questions}
                        totalPages={totalPages}
                    />
                </div>
            ) : (
                <div className="w-1/2 flex flex-col justify-center items-center text-center gap-12 mt-28 px-10 py-16 border-2 border-slate-300 rounded-lg bg-slate-100">
                    <h1 className="text-4xl leading-normal font-bold">
                        Elke <span className="text-[#12A8C0]">ITvitae'er</span>{" "}
                        heeft een tabblad openstaan met Stack Underflow
                    </h1>
                    <h2 className="text-lg">
                        Vind het beste antwoord op jouw technische vraag, help
                        anderen met het beantwoorden van die van hen.
                    </h2>
                    <button
                        className="register-button"
                        onClick={() => navigate("/registreren")}
                    >
                        Registreer je nu!
                    </button>
                </div>
            )}
        </>
    );
}

export default Home;
