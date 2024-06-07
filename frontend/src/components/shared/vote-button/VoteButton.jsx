import React from "react";

function VoteButton({ onVote, votes, userHasUpVoted, userHasDownVoted }) {
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={() => onVote(userHasUpVoted ? 0 : 1)}
                className={`text-2xl ${
                    userHasUpVoted ? "text-[#FF6D00]" : "text-gray-400"
                }`}
            >
                ▲
            </button>
            <p className="font-bold">{votes}</p>
            <button
                onClick={() => onVote(userHasDownVoted ? 0 : -1)}
                className={`text-2xl ${
                    userHasDownVoted ? "text-[#2397F4]" : "text-gray-400"
                }`}
            >
                ▼
            </button>
        </div>
    );
}

export default VoteButton;
