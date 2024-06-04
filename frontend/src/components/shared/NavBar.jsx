import "./NavBar.css"
import logo from "../../assets/images/stack_underflow_logo.png"
import { useNavigate } from "react-router-dom"
import UserService from "../../services/UserService";
import User from "./User/User";

export default function NavBar() {

    const navigate = useNavigate();

    return <div className=" sticky top-0 h-14 w-screen bg-white text-gray-900 border-gray-500 border-b ">
        <button className="home-button" onClick={() => navigate("")}><img src={logo} className=" h-14 float-left "></img> <div className=" float-left mt-4 mr-2 ">stack<b>underflow</b></div></button>
        <div>
            <button className="nav-button" onClick={() => navigate("/vragen")}>Vragen</button>
            <button className="nav-button" onClick={() => navigate("/leaderbord")}>Leaderbord</button>
        </div>
        <div className="float-right flex items-center pr-[5px] h-[100%]">
            {
                UserService.isLoggedIn() ?
                <>
                    <button className="login-button" onClick={() => { 
                        UserService.logout();
                        navigate("/");
                    }}>Uitloggen</button>
                    <User username={UserService.getUser().username}/>
                </>
                :
                <>
                    <button className="login-button" onClick={() => navigate("/inloggen")}>Inloggen</button>
                    <button className="register-button" onClick={() => navigate("/registreren")}>Registreren</button>
                </>
            }
        </div>
    </div >
}