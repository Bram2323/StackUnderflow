import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import LeaderboardList from "./LeaderboardList";
import { useSearchParams } from "react-router-dom";

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

    return (
        <>
            <div className="pt-3 w-3/5 flex flex-col gap-3">
                <LeaderboardList users={users} totalPages={totalPages} />
            </div>
        </>
    );
}
