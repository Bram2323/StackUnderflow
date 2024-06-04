import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./Question.css";
import Answer from "./Answer/Answer";
import User from "../shared/User/User";

function Question() {
    const [question, setQuestion] = useState();
    const { id } = useParams();

    useEffect(() => {
        ApiService.get("vragen/" + id).then((response) => {
            setQuestion(response.data);
    });
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
                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]"/>
                <p>{question.text}</p>
                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]"/>
                <div className="flex gap-[10px] items-center">
                    <User user={question.user} />
                    <p className="pt-[3px]">{formattedDate}</p>
                </div>
            </div>
            <div className="answer-container flex flex-col gap-[10px]">
                {[...question.answers].sort((a, b) => {
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    if (aDate < bDate) return -1;
                    if (aDate > bDate) return 1;
                    return 0;
                }).map((answer, index) => <Answer key={index} answer={answer} />)}
            </div>
        </div>
    );
}

export default Question;
