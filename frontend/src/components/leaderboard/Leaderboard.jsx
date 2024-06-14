import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import Pageable from "../shared/pageable/Pageable";
import LeaderboardItem from "./LeaderboardItem";

export default function Leaderboard({ totalPages }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = "leaderboard/get-all-users";
        ApiService.get(url).then((response) => {
            setUsers(response.data);
        });
    }, []);

    return (
        <>
            <Pageable totalPages={totalPages} />
            {users.map((users, index) => (
                <LeaderboardItem user={users} key={index} />
            ))}
            <Pageable totalPages={totalPages} />
        </>
    );
}
