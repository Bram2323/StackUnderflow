import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./Question.css";

function Question() {
    const [question, setQuestion] = useState();
    const { id } = useParams();

    useEffect(() => {
        ApiService.get("vragen/1").then((response) =>
            setQuestion(response.data)
        );
    }, []);

    if (question === undefined) {
        return <></>;
    }
    const creationDate = new Date(question.date);
    const formattedDate = new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Amsterdam",
    }).format(creationDate);

    return (
        <div className="question">
            <div className="question-container">
                <h2 className="question-title">{question.title}</h2>
                <p>{question.user.username}</p>
                <p>{formattedDate}</p>
                <p>{question.text}</p>
            </div>
        </div>
    );
}

export default Question;
