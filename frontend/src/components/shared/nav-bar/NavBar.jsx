import "./NavBar.css";
import logo from "../../../assets/images/stack_underflow_logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import UserService from "../../../services/UserService";
import User from "../User/User";

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
        <div className=" sticky top-0 h-14 w-full bg-white text-gray-900 border-gray-500 border-b ">
            <button className="home-button" onClick={() => navigate("")}>
                <img src={logo} className=" h-14 float-left "></img>{" "}
                <div className=" float-left mt-4 mr-2 ">
                    stack<b>underflow</b>
                </div>
            </button>
            <div>
                <button
                    className="nav-button"
                    onClick={() => navigate("/vragen")}
                >
                    Vragen
                </button>
                <button
                    className="nav-button"
                    onClick={() => navigate("/leaderbord")}
                >
                    Leaderbord
                </button>
            </div>
            <div className="float-right flex items-center pr-1.5 h-full">
                {UserService.isLoggedIn() ? (
                    <>
                        <button
                            className="login-button"
                            onClick={() => {
                                UserService.logout();
                                navigate(currentPath);
                            }}
                        >
                            Uitloggen
                        </button>
                        <User user={UserService.getUser()} />
                    </>
                ) : (
                    <>
                        <button
                            className="login-button"
                            onClick={() =>
                                navigate("/inloggen", {
                                    state: {
                                        prevPath: prevPath,
                                    },
                                })
                            }
                        >
                            Inloggen
                        </button>
                        <button
                            className="register-button"
                            onClick={() =>
                                navigate("/registreren", {
                                    state: {
                                        prevPath: prevPath,
                                    },
                                })
                            }
                        >
                            Registreren
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
