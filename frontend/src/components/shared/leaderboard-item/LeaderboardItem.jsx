import User from "../User/User";

export default function LeaderboardItem({ user }) {
    return (
        <>
            {user.leaderboardRanking !== null && user.totalPoints > 0 ? (
                <div className=" pl-5 grid grid-cols-[20%_60%_20%] items-center rounded-md border-2 border-neutral-300 bg-gray-200 p-2">
                    <div className=" col-start-1 col-end-1 font-bold text-2xl ">
                        #{user.leaderboardRanking}
                    </div>
                    <div className="col-start-2 col-end-2">
                        <div className=" w-fit ">
                            <User user={user} />
                        </div>
                    </div>
                    <div className="col-start-3 col-end-3 font-semibold">
                        {user.totalPoints +
                            (user.totalPoints === 1 ? " punt" : " punten")}
                    </div>
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
