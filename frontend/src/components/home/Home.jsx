import React from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import Button from "../shared/button/Button";
import LeaderboardItem from "../shared/leaderboard-item/LeaderboardItem";
import UserInfo from "../shared/user-info/UserInfo";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            {UserService.isLoggedIn() ? (
                <div className=" w-3/5">
                    <UserInfo user={UserService.getUser()} />
                </div>
            ) : (
                <div className="w-1/2 flex flex-col justify-center items-center text-center gap-12 mt-28 px-10 py-16 border-2 border-slate-300 rounded-lg bg-slate-100">
                    <h1 className="text-4xl leading-normal font-bold">
                        Elke <span className="text-[#12A8C0]">ITvitae'er</span>{" "}
                        heeft een tabblad openstaan met Stack Underflow
                    </h1>
                    <h2 className="text-lg">
                        Vind het beste antwoord op jouw technische vraag, help
                        anderen met het beantwoorden van die van hen.
                    </h2>
                    <Button
                        text={"Registreer je nu!"}
                        onClick={() => navigate("/registreren")}
                    />
                </div>
            )}
        </>
    );
}

export default Home;
