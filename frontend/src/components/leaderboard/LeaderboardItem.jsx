import User from "../shared/User/User";

export default function LeaderboardItem({ user }) {
    return (
        <div className=" bg-gray-300 p-2 my-2">
            <div className="question-title">
                rank: {user.leaderboardRanking}
            </div>
            <div className=" flex items-center gap-1">
                <p>naam:</p> <User user={user} />
            </div>
            <div>punten: {user.totalPoints}</div>
        </div>
    );
}
