import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import User from "../shared/User/User";

function formatDate(date) {
    const creationDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Amsterdam",
    }).format(creationDate);

    return formattedDate;
}

function QuestionOverview() {
    const [questions, setQuestions] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        ApiService.get("questions").then((response) =>
            setQuestions(response.data)
        );
    }, []);

    if (questions === undefined) {
        return <></>;
    }

    return (
        <div className=" w-3/4 ">
            {questions.map((question) => (
                <div
                    className=" cursor-pointer bg-gray-300 pt-2 pb-2 pl-2 mt-2"
                    onClick={() => navigate(`/vragen/${question.id}`)}
                    key={question.id}
                >
                    <div className="font-bold text-center hover:underline">
                        {question.title}
                    </div>
                    <div className=" flex items-center gap-1">
                        <p>geplaatst door:</p> <User user={question.user} />
                    </div>
                    <div>datum: {formatDate(question.date)}</div>
                </div>
            ))}
        </div>
    );
}

export default QuestionOverview;
