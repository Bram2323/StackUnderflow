import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom"

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
        ApiService.get("vragen").then((response) =>
            setQuestions(response.data)
            //console.log(response.data[0].title)
        );
    }, []);

    if (questions === undefined) {
        return <></>;
    }

    return <div>
        {questions.map((question) =>
            <div key={question.id} onClick={() => navigate(`/vragen/${question.id}`)}>title: {question.title} username: {question.user.username} date: {formatDate(question.date)}</div>)}
    </div>;
}

export default QuestionOverview;