import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionFilter from "../question-filter/QuestionFilter";
import QuestionList from "../question-list/QuestionList";
import ApiService from "../../../services/ApiService";
import LeaderboardItem from "../leaderboard-item/LeaderboardItem";
import UserService from "../../../services/UserService";
import User from "../User/User";

function UserInfo({ user, showAskQuestion = true }) {
    const [questions, setQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [queryParams] = useSearchParams();

    useEffect(() => {
        ApiService.get("questions/user/" + user.username, queryParams).then(
            (response) => {
                setQuestions(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        );
    }, [queryParams, user]);

    const isCurrentUser =
        UserService.isLoggedIn() && user.id == UserService.getUser().id;

    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    const month = date.toLocaleString("nl-NL", { month: "long" });

    return (
        <>
            <div className="flex flex-col gap-3 mb-12">
                <div className="flex items-center justify-center gap-1 mt-12 mb-6">
                    <User user={user} className=" scale-[2]" />
                </div>
                {user.leaderboardRanking && (
                    <>
                        <p className=" font-bold text-center pt-5 text-2xl">
                            {isCurrentUser
                                ? `Jouw rank van de maand: ${month} ${date.getFullYear()}`
                                : `Rank van de maand: ${month} ${date.getFullYear()}`}
                        </p>
                        <LeaderboardItem user={user} />
                    </>
                )}
                <div className="flex items-baseline justify-between gap-10 mt-3">
                    <h1 className="font-bold text-center text-2xl">
                        {isCurrentUser ? "Mijn vragen" : "Vragen"}
                    </h1>
                </div>
                <QuestionFilter showAskQuestion={showAskQuestion} />
                <hr className="w-full border-none h-[2px] bg-[#e9e9e9]" />
                <QuestionList questions={questions} totalPages={totalPages} />
            </div>
        </>
    );
}

export default UserInfo;
