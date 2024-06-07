import User from "../../shared/User/User";
import VoteButton from "../../shared/vote-button/VoteButton";
import ApiService from "../../../services/ApiService";
import UserService from "../../../services/UserService";
import CodeHighlighter from "../../shared/codeblock/CodeHighlighter/CodeHighlighter";

function Answer({ answer, setAnswer }) {
    const creationDate = new Date(answer.date);
    const formattedDate = new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Amsterdam",
    }).format(creationDate);

    function vote(vote) {
        if (!UserService.isLoggedIn()) return;
        ApiService.patch("answers/" + answer.id + "/votes", {
            isUpVote: vote === 1,
            isDownVote: vote === -1,
        }).then((response) => setAnswer(response.data));
    }

    return (
        <div className="flex items-start gap-3">
            <VoteButton
                onVote={vote}
                votes={answer.votes}
                userHasUpVoted={answer.userHasUpVoted}
                userHasDownVoted={answer.userHasDownVoted}
            />
            <div className="answer-container w-full flex flex-col gap-[10px] bg-gray-100 p-[15px] rounded-[10px] border border-solid border-gray-400">
                <CodeHighlighter markdown={answer.text} />
                <hr />
                <div className="flex gap-[10px] items-center">
                    <User user={answer.user} />
                    <p className="pt-[3px]">{formattedDate}</p>
                </div>
            </div>
        </div>
    );
}

export default Answer;
