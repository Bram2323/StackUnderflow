import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom"

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

    // for (let i = 0; i < questions.length; i++) {
    //     console.log(questions[i].title);
    //     const creationDate = new Date(questions[i].date);
    //     const formattedDate = new Intl.DateTimeFormat("nl-NL", {
    //         dateStyle: "short",
    //         timeStyle: "short",
    //         timeZone: "Europe/Amsterdam",
    //     }).format(creationDate);
    // }

    // const listItems = questions.map((question) =>
    //     <div>{question.title} {question.user.username} {question.date}</div>
    // );

    return <div>
        {questions.map((question) =>
            <div key={question.id} onClick={() => navigate(`/vragen/${question.id}`)}>title: {question.title} username: {question.user.username} date: {question.date}</div>)}
    </div>;
}

export default QuestionOverview;