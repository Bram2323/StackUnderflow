import "./NavBar.css"
import logo from "../../assets/images/stack_underflow_logo.png"
import { useNavigate } from "react-router-dom"

export default function NavBar() {

    const navigate = useNavigate();

    return <div className=" sticky top-0 h-14 w-screen bg-white text-gray-900 border-gray-500 border-b ">
        <div className="home-button" onClick={() => navigate("")}><img src={logo} className=" h-14 float-left "></img> <div className=" float-left mt-4 mr-2 ">stack<b>underflow</b></div></div>
        <ul>
            <li className="nav-button" onClick={() => navigate("/vragen")}>Vragen</li>
            <li className="nav-button" onClick={() => navigate("/leaderbord")}>Leaderbord</li>
        </ul>
        <ul className="float-right">
            <li className="register-button" onClick={() => navigate("/registreren")}>Registreren</li>
            <li className="login-button" onClick={() => navigate("/inloggen")}>Inloggen</li>
        </ul>
    </div >
}