import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./Question.css";
import User from "../shared/User/User";
import ContentFormatter from "../shared/formatter/ContentFormatter/ContentFormatter";
import AnswerForm from "./answer-form/AnswerForm";
import UserService from "../../services/UserService";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../shared/date-formatter/FormatDate";
import AnswerList from "./answer-list/AnswerList";
import { useSearchParams } from "react-router-dom";
import ConfirmDialog from "../shared/confirm-dialog/ConfirmDialog";
import Dropdown from "../shared/dropdown/Dropdown";

function Question() {
    const [queryParams, setQueryParams] = useSearchParams();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [orderQuery, setOrderQuery] = useState(
        queryParams.has("order-by") ? queryParams.get("order-by") : ""
    );

    const orderOptions = [
        { value: "votes-desc", text: "Meeste votes" },
        { value: "votes-asc", text: "Minste votes" },
        { value: "date-desc", text: "Nieuwste antwoorden" },
        { value: "date-asc", text: "Oudste antwoorden" },
    ];

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
    const isAdmin = UserService.isLoggedIn() && UserService.getUser().isAdmin;

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
        if (!UserService.isLoggedIn || (!isQuestionOwner && !isAdmin)) {
            return;
        }
        setIsDialogOpen(true);
    }

    function confirmDelete() {
        ApiService.delete(`questions/${id}`).then(() => navigate("/vragen"));
        setIsDialogOpen(false);
    }

    function cancelDelete() {
        setIsDialogOpen(false);
    }

    function getCategoryName(category) {
        switch (category) {
            case "CYBER":
                return "Cyber Security";
            case "DATA":
                return "Data Engineering / Science";
            case "JAVA":
                return "Java";
            case "CLOUD":
                return "Cloud Engineering";
            case "GENERAL":
                return "Algemeen";
            default:
                return category;
        }
    }

    function handleOrderChange(newOrder) {
        if (newOrder === orderQuery) return;
        setOrderQuery(newOrder);
        queryParams.set("order-by", newOrder);
        queryParams.delete("page");
        setQueryParams(queryParams);
    }

    return (
        <div className="question mb-12 max-w-[800px] w-[90%]">
            <div className="question-container rounded-[10px] border border-neutral-400 shadow">
                <h2 className="w-full font-bold whitespace-pre-wrap break-words">
                    {question.title}
                </h2>
                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]" />

                <ContentFormatter content={question.text} />

                <hr className="w-full border-none h-[2px] bg-[#C0C0C0]" />

                <div className="flex justify-between w-full gap-2 max-sm:flex-col">
                    <div className="flex gap-4 items-center max-sm:flex-col">
                        <User user={question.user} />
                        <div className="flex gap-4 items-center">
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
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <p className="text-xs bg-[#12A8C0] text-white rounded-full text-center py-1 px-2 ">
                            {getCategoryName(question.category)}
                        </p>
                        {isQuestionOwner && (
                            <FontAwesomeIcon
                                icon={faPen}
                                className="cursor-pointer text-neutral-500"
                                onClick={handleEdit}
                            />
                        )}

                        {(isQuestionOwner || isAdmin) && (
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="cursor-pointer text-neutral-500"
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
            <Dropdown
                value={orderQuery}
                setValue={handleOrderChange}
                options={orderOptions}
                name="orders"
                className="w-fit"
            />
            <AnswerList
                answers={answers}
                setAnswers={setAnswers}
                setAnswer={setAnswer}
                isQuestionOwner={isQuestionOwner}
                totalPages={totalPages}
            />
            {isDialogOpen && (
                <ConfirmDialog
                    message="Weet je zeker dat je deze vraag wil verwijderen?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}

export default Question;
