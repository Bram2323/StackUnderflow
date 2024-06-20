import "./NavBar.css";
import logo from "../../../assets/images/stack_underflow_logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import UserService from "../../../services/UserService";
import User from "../User/User";
import Button from "../button/Button";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    let prevPath;
    const currentPath = location.pathname;
    if (
        !currentPath.startsWith("/inloggen") &&
        !currentPath.startsWith("/registreren")
    ) {
        prevPath = currentPath;
    } else {
        prevPath =
            location.state && location.state.prevPath
                ? location.state.prevPath
                : null;
    }

    return (
        <div className="sticky select-none top-0 h-14 w-full bg-white text-gray-900 border-gray-500 border-b z-[9999]">
            <button className="home-button" onClick={() => navigate("")}>
                <img src={logo} className=" h-14 float-left "></img>{" "}
                <div className=" float-left mt-4 mr-2 ">
                    stack<b>underflow</b>
                </div>
            </button>
            <div>
                <button
                    className={
                        "nav-button " +
                        (location.pathname == "/vragen" && " text-[#FF6D00]")
                    }
                    onClick={() => navigate("/vragen")}
                >
                    Vragen
                </button>
                <button
                    className={
                        "nav-button " +
                        (location.pathname == "/leaderbord" &&
                            " text-[#FF6D00]")
                    }
                    onClick={() => navigate("/leaderbord")}
                >
                    Leaderbord
                </button>
            </div>
            <div className="float-right flex items-center gap-2 pr-1.5 h-full">
                {UserService.isLoggedIn() ? (
                    <>
                        <Button
                            text={"Uitloggen"}
                            isLoginOrOut={true}
                            onClick={() => {
                                UserService.logout();
                                navigate(currentPath);
                            }}
                        />
                        <User user={UserService.getUser()} />
                    </>
                ) : (
                    <>
                        <Button
                            text={"Inloggen"}
                            isLoginOrOut={true}
                            onClick={() =>
                                navigate("/inloggen", {
                                    state: {
                                        prevPath: prevPath,
                                    },
                                })
                            }
                        />
                        <Button
                            text={"Registreren"}
                            onClick={() =>
                                navigate("/registreren", {
                                    state: {
                                        prevPath: prevPath,
                                    },
                                })
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
}
