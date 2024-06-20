import Pageable from "../shared/pageable/Pageable";
import LeaderboardItem from "../shared/leaderboard-item/LeaderboardItem";

export default function LeaderboardList({ users, totalPages }) {
    return (
        <div className="flex flex-col gap-2 overflow-x-auto">
            <Pageable totalPages={totalPages} />
            {users.length == 0 ? (
                <p>Geen gebruikers gevonden!</p>
            ) : (
                users.map((users, index) => (
                    <LeaderboardItem user={users} key={index} />
                ))
            )}
            <Pageable totalPages={totalPages} />
        </div>
    );
}
