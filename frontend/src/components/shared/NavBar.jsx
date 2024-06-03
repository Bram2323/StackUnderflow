import "./NavBar.css"
import logo from "../../assets/images/stack_underflow_logo.png"

export default function NavBar() {
    return <div className=" sticky top-0 h-14 w-screen bg-white text-gray-900 border-gray-500 border-b ">
        <div className="home-button"><img src={logo} className=" h-14 float-left "></img> <div className=" float-left mt-4 mr-2 ">stack<b>underflow</b></div></div>
        <ul>
            <li className="nav-button">Home</li>
            <li className="nav-button">Vragen</li>
            <li className="nav-button">Leaderbord</li>
        </ul>
        <ul className="float-right">
            <li className="register-button">Registreren</li>
            <li className="login-button">Inloggen</li>
        </ul>
    </div >
}