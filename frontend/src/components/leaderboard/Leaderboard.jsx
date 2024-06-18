import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import LeaderboardList from "./LeaderboardList";
import { useSearchParams } from "react-router-dom";
import UserService from "../../services/UserService";
import LeaderboardItem from "../shared/leaderboard-item/LeaderboardItem";

export default function Leaderboard() {
    const [queryParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const url = "leaderboard/get-all-users";
        ApiService.get(url, queryParams).then((response) => {
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);
        });
    }, [queryParams]);

    var date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    const month = date.toLocaleString("nl-NL", { month: "long" });

    return (
        <>
            <p className=" font-bold text-center pt-5 text-3xl ">
                Leaderbord van de maand: {month} {date.getFullYear()}
            </p>
            {UserService.isLoggedIn() && (
                <div className="pt-3 pb-3 w-3/5 flex flex-col gap-3 border-b-2 border-gray-400">
                    <p className=" font-bold text-center">Jouw rank:</p>
                    <LeaderboardItem user={UserService.getUser()} />
                </div>
            )}
            <div className="pt-3 w-3/5 flex flex-col gap-3">
                <LeaderboardList users={users} totalPages={totalPages} />
            </div>
        </>
    );
}
