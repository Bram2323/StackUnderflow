import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./Question.css";
import User from "../shared/User/User";
import CodeHighlighter from "../shared/codeblock/CodeHighlighter/CodeHighlighter";
import AnswerForm from "./answer-form/AnswerForm";
import UserService from "../../services/UserService";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../shared/date-formatter/FormatDate";
import AnswerList from "./answer-list/AnswerList";
import { useSearchParams } from "react-router-dom";

function Question() {
    const [queryParams] = useSearchParams();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.get("questions/" + id).then((response) => {
            setQuestion(response.data);
        });
    }, []);

    useEffect(() => {
        getAnswers();
    }, [queryParams]);

    if (question === undefined) {
        return <></>;
    }

    const isQuestionOwner =
        UserService.isLoggedIn() &&
        question.user.id === UserService.getUser().id;

    function getAnswers() {
        ApiService.get(`questions/${id}/answers`, queryParams).then(
            (response) => {
                setAnswers(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        );
    }

    function setAnswer(newAnswer) {
        const newAnswers = answers.map((answer) =>
            answer.id == newAnswer.id ? newAnswer : answer
        );
        setAnswers(newAnswers);
    }

    function handleAddAnswer() {
        getAnswers();
    }

    function handleEdit() {
        navigate(`/vragen/${id}/bewerken`, {
            state: {
                editMode: true,
                questionId: id,
                isQuestionOwner: isQuestionOwner,
            },
        });
    }

    function handleDelete() {
        if (!UserService.isLoggedIn || !isQuestionOwner) {
            return;
        }
        ApiService.delete(`questions/${id}`).then(() => navigate("/vragen"));
    }

    return (
        <div className="question mb-12">
            <div className="question-container">
                <h2 className="font-bold text-center">{question.title}</h2>
                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]" />

                <CodeHighlighter markdown={question.text} />

                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]" />

                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <User user={question.user} />
                        </div>
                        <div className="leading-tight text-[12px] flex flex-col justify-center">
                            <p>Gevraagd op:</p>
                            <p>{formatDate(question.date)}</p>
                        </div>
                        {question.lastEdited && (
                            <div className="leading-tight text-[12px] flex flex-col justify-center">
                                <p>Bewerkt op:</p>
                                <p>{formatDate(question.lastEdited)}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        {isQuestionOwner && (
                            <FontAwesomeIcon
                                icon={faPen}
                                className="cursor-pointer"
                                onClick={handleEdit}
                            />
                        )}

                        {isQuestionOwner && (
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="cursor-pointer"
                                onClick={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="answer-form-container">
                <AnswerForm
                    questionId={question.id}
                    addAnswer={handleAddAnswer}
                />
            </div>
            <AnswerList
                answers={answers}
                setAnswer={setAnswer}
                isQuestionOwner={isQuestionOwner}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Question;
