import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom"
import "./QuestionOverview.css"

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
            //console.log(response.data[0].title)
        );
    }, []);

    if (questions === undefined) {
        return <></>;
    }

    return <div className=" w-3/4 ">
        {questions.map((question) =>
            <div className=" bg-gray-300 pt-2 pb-2 pl-2 mt-2" key={question.id}>
                <div className="question-title" onClick={() => navigate(`/vragen/${question.id}`)}>{question.title}</div>
                <div>geplaatst door: {question.user.username}</div>
                <div>datum: {formatDate(question.date)}</div>
            </div>)}
    </div>;
}

export default QuestionOverview;