import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import LeaderboardList from "./LeaderboardList";
import { useSearchParams } from "react-router-dom";
import UserService from "../../services/UserService";
import LeaderboardItem from "./LeaderboardItem";

export default function Leaderboard() {
    const [queryParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [ownRanking, setOwnRanking] = useState(null);

    useEffect(() => {
        const url = "leaderboard/get-all-users";
        ApiService.get(url, queryParams).then((response) => {
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);

            if (!UserService.isLoggedIn()) return;

            ApiService.get("leaderboard/get-own-ranking", queryParams).then(
                (response) => {
                    setOwnRanking(response.data);
                }
            );
        });
    }, [queryParams]);

    return (
        <>
            {UserService.isLoggedIn() && ownRanking ? (
                <div className="pt-3 pb-3 w-3/5 flex flex-col gap-3 border-b-2 border-gray-400">
                    <p className=" font-bold text-center">Jouw rank:</p>
                    <LeaderboardItem user={ownRanking} />
                </div>
            ) : (
                ""
            )}
            <div className="pt-3 w-3/5 flex flex-col gap-3">
                <LeaderboardList users={users} totalPages={totalPages} />
            </div>
        </>
    );
}
