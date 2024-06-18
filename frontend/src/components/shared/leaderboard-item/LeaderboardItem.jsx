import User from "../User/User";

export default function LeaderboardItem({ user }) {
    return (
        <>
            {user.leaderboardRanking !== null ? (
                <div className=" bg-gray-300 p-2 my-2">
                    <div className="question-title">
                        rank: {user.leaderboardRanking}
                    </div>
                    <div className=" flex items-center gap-1">
                        <p>naam:</p> <User user={user} />
                    </div>
                    <div>punten: {user.totalPoints}</div>
                </div>
            ) : (
                <p>
                    Het ziet er naar uit dat je nog geen rank hebt gehad vorige
                    maand. Neem deel door antwoorden te geven op vragen en
                    hiermee punten te krijgen van andere gebruikers.
                </p>
            )}
        </>
    );
}
