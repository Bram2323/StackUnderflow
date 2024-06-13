import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./Question.css";
import Answer from "./answer/Answer";
import User from "../shared/User/User";
import CodeHighlighter from "../shared/codeblock/CodeHighlighter/CodeHighlighter";
import AnswerForm from "./answer-form/AnswerForm";
import UserService from "../../services/UserService";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../shared/date-formatter/FormatDate";

function Question() {
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.get("questions/" + id).then((response) => {
            setQuestion(response.data);
            setAnswers(response.data.answers);
        });
    }, []);

    if (question === undefined) {
        return <></>;
    }

    const isQuestionOwner =
        UserService.isLoggedIn() &&
        question.user.id === UserService.getUser().id;

    function setAnswer(newAnswer) {
        const newAnswers = answers.map((answer) =>
            answer.id == newAnswer.id ? newAnswer : answer
        );
        setAnswers(newAnswers);
    }

    const solutions = answers
        .filter((answer) => answer.isSolution)
        .sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            if (aDate < bDate) return -1;
            if (aDate > bDate) return 1;
            return 0;
        });
    const nonSolutions = answers
        .filter((answer) => !answer.isSolution)
        .sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            if (aDate < bDate) return -1;
            if (aDate > bDate) return 1;
            return 0;
        });

    function handleEdit() {
        navigate(`/vragen/${id}/bewerken`, {
            state: {
                editMode: true,
                questionId: id,
                isQuestionOwner: isQuestionOwner,
            },
        });
    }

    return (
        <div className="question">
            <div className="question-container">
                <h2 className="font-bold text-center">{question.title}</h2>
                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]" />

                <CodeHighlighter markdown={question.text} />

                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]" />

                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                            <User user={question.user} />
                        </div>
                        <div className="flex items-center gap-6">
                            <p className="pt-[3px]">{`gevraagd op: ${formatDate(
                                question.date
                            )}`}</p>
                            {question.lastEdited && (
                                <p>{`bewerkt: ${formatDate(
                                    question.lastEdited
                                )}`}</p>
                            )}
                        </div>
                    </div>

                    {isQuestionOwner && (
                        <FontAwesomeIcon
                            icon={faPen}
                            className="cursor-pointer"
                            onClick={handleEdit}
                        />
                    )}
                </div>
            </div>
            <div className="answer-form-container">
                <AnswerForm
                    questionId={question.id}
                    answers={answers}
                    setAnswers={setAnswers}
                />
            </div>
            <div className="flex flex-col gap-[20px] pb-2">
                {[...solutions, ...nonSolutions].map((answer, index) => (
                    <Answer
                        key={index}
                        answer={answer}
                        setAnswer={setAnswer}
                        isQuestionOwner={isQuestionOwner}
                    />
                ))}
            </div>
        </div>
    );
}

export default Question;
