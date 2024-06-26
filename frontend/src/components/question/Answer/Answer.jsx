import { useState } from "react";
import User from "../../shared/User/User";
import VoteButton from "../../shared/vote-button/VoteButton";
import ApiService from "../../../services/ApiService";
import UserService from "../../../services/UserService";
import ContentFormatter from "../../shared/formatter/ContentFormatter/ContentFormatter";
import CheckMark from "../../../assets/images/checkmark.svg";
import "./Answer.css";
import { formatDate } from "../../shared/date-formatter/FormatDate";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnswerForm from "../answer-form/AnswerForm";
import ConfirmDialog from "../../shared/confirm-dialog/ConfirmDialog";

function Answer({ answer, setAnswer, answers, setAnswers, isQuestionOwner }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function vote(vote) {
        if (!UserService.isLoggedIn()) return;
        ApiService.patch("answers/" + answer.id + "/votes", {
            isUpVote: vote === 1,
            isDownVote: vote === -1,
        }).then((response) => setAnswer(response.data));
    }

    function setSolution(solution) {
        if (!UserService.isLoggedIn() || !isQuestionOwner) return;
        ApiService.patch("answers/" + answer.id, { isSolution: solution }).then(
            (response) => {
                setAnswer(response.data);
            }
        );
    }

    function handleDelete() {
        if (!UserService.isLoggedIn || (!isAnswerOwner && !isAdmin)) {
            return;
        }
        setIsDialogOpen(true);
    }

    function confirmDelete() {
        ApiService.delete(`answers/${answer.id}`).then(() => {
            const updatedAnswers = answers.filter((a) => a.id !== answer.id);
            setAnswers(updatedAnswers);
        });
        setIsDialogOpen(false);
    }

    function cancelDelete() {
        setIsDialogOpen(false);
    }

    function handleUpdateAnswer(updatedAnswer) {
        setAnswer(updatedAnswer);
    }

    const isAnswerOwner =
        UserService.isLoggedIn() && answer.user.id === UserService.getUser().id;
    const isAdmin = UserService.isLoggedIn() && UserService.getUser().isAdmin;

    return (
        <div
            className={
                "answer-container flex-grow-0 box-border w-full max-w-full flex gap-2"
            }
        >
            <div className="flex flex-col items-center gap-[2px]">
                <VoteButton
                    onVote={vote}
                    votes={answer.votes}
                    userHasUpVoted={answer.userHasUpVoted}
                    userHasDownVoted={answer.userHasDownVoted}
                />
                <button
                    onClick={() => setSolution(!answer.isSolution)}
                    className={`checkmark-button select-none transition-all duration-200 ${
                        isQuestionOwner
                            ? answer.isSolution
                                ? ""
                                : "opacity-0 selectable"
                            : answer.isSolution
                            ? "cursor-default"
                            : "hidden"
                    }`}
                >
                    <img src={CheckMark} className="w-4 h-4" />
                </button>
            </div>

            {isEditing ? (
                <AnswerForm
                    answerToEdit={answer}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isAnswerOwner={isAnswerOwner}
                    updateAnswer={handleUpdateAnswer}
                />
            ) : (
                <div className="box-border shadow min-w-0 w-full flex flex-col gap-[10px] bg-gray-100 p-[15px] rounded-[10px] border border-solid border-gray-400">
                    <ContentFormatter content={answer.text} />

                    <hr />
                    <div className="flex items-center justify-between w-full gap-2 max-sm:flex-col">
                        <div className="flex gap-4 max-sm:flex-col max-sm:items-center">
                            <User user={answer.user} />
                            <div className="flex gap-4">
                                <div className="leading-tight text-[12px] flex flex-col justify-center">
                                    <p>Beantwoord op:</p>
                                    <p>{formatDate(answer.date)}</p>
                                </div>
                                {answer.lastEdited && (
                                    <div className="leading-tight text-[12px] flex flex-col justify-center">
                                        <p>Bewerkt op:</p>
                                        <p>{formatDate(answer.lastEdited)}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {isAnswerOwner && !isEditing && (
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className="cursor-pointer text-neutral-500"
                                    onClick={() => setIsEditing(true)}
                                />
                            )}
                            {(isAnswerOwner || isAdmin) && (
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className="cursor-pointer text-neutral-500"
                                    onClick={handleDelete}
                                />
                            )}
                            {isDialogOpen && (
                                <ConfirmDialog
                                    message="Weet je zeker dat je dit antwoord wil verwijderen?"
                                    onConfirm={confirmDelete}
                                    onCancel={cancelDelete}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Answer;
