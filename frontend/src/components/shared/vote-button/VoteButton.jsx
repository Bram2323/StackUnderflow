import React from "react";

function VoteButton({ onVote, votes, userHasUpVoted, userHasDownVoted }) {
    console.log(userHasUpVoted, userHasDownVoted);

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={() => onVote(userHasUpVoted ? 0 : 1)}
                className="bg-gray-200 p-2 rounded-full"
            >
                +
            </button>
            <p>{votes}</p>
            <button
                onClick={() => onVote(userHasDownVoted ? 0 : -1)}
                className="bg-gray-200 p-2 rounded-full"
            >
                -
            </button>
        </div>
    );
}

export default VoteButton;
