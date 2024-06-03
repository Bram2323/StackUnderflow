import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../shared/InputField/InputField";
import UserService from "../../services/UserService";
import "./Login.css";


function translateError(error){
    switch (error) {
        case "Username is required!":
            return "Gebruikersnaam is verplicht!"
        case "Password is required!":
            return "Wachtwoord is verplicht!"
        case "User doesn't exist!":
            return "Gebruiker bestaat niet!"
        case "Password is incorrect!":
            return "Wachtwoord is verkeerd!"
        default:
            break;
    }

    return error;
}


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleLogin(){
        UserService.login(username, password).then(() => {
            navigate("/");
        }).catch((error) => {
            setError(translateError(error));
        });
    }

    return ( <>
        <div className="login-form">
            <div className="login-input">
                <InputField label="Gebruikersnaam" text={username} onTextChanged={setUsername} onSubmit={handleLogin}/>
                <InputField label="Wachtwoord" text={password} onTextChanged={setPassword} hidden={true} onSubmit={handleLogin}/>
            </div>
            {error != "" ? 
                <p className="login-error">{error}</p>
            : null}
            <button onClick={handleLogin}>Login</button>
        </div>
    </> );
}

export default Login;