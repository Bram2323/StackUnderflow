import User from "../../shared/User/User";
import VoteButton from "../../shared/vote-button/VoteButton";
import ApiService from "../../../services/ApiService";
import UserService from "../../../services/UserService";
import CodeHighlighter from "../../shared/codeblock/CodeHighlighter/CodeHighlighter";
import CheckMark from "../../../assets/images/checkmark.svg";
import "./Answer.css";
import { formatDate } from "../../shared/date-formatter/FormatDate";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Answer({ answer, setAnswer, answers, setAnswers, isQuestionOwner }) {
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
        if (!UserService.isLoggedIn || !isAnswerOwner) {
            return;
        }
        ApiService.delete(`answers/${answer.id}`).then(() => {
            const updatedAnswers = answers.filter((a) => a.id !== answer.id);
            setAnswers(updatedAnswers);
        });
    }

    const isAnswerOwner =
        UserService.isLoggedIn() && answer.user.id === UserService.getUser().id;

    return (
        <div className={"answer-container flex items-start gap-2"}>
            <div className="flex flex-col items-center gap-[2px]">
                <VoteButton
                    onVote={vote}
                    votes={answer.votes}
                    userHasUpVoted={answer.userHasUpVoted}
                    userHasDownVoted={answer.userHasDownVoted}
                />
                <button
                    onClick={() => setSolution(!answer.isSolution)}
                    className={`checkmark-button transition-all duration-200 ${
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
            <div className="answer-container w-full flex flex-col gap-[10px] bg-gray-100 p-[15px] rounded-[10px] border border-solid border-gray-400">
                <CodeHighlighter markdown={answer.text} />
                <hr />
                <div className="flex gap-[10px] items-center">
                    <User user={answer.user} />
                    <p className="pt-[3px]">{formatDate(answer.date)}</p>
                    {isAnswerOwner && (
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            className="cursor-pointer"
                            onClick={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Answer;
