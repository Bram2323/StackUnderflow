import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import InputField from "../shared/input-field/InputField";
import UserService from "../../services/UserService";
import Button from "../shared/button/Button";
import "./Register.css";

function translateError(error) {
    switch (error) {
        case "Username is required!":
            return "Gebruikersnaam is verplicht!";
        case "Password is required!":
            return "Wachtwoord is verplicht!";
        case "Username is invalid!":
            return "Gebruikersnaam is niet toegestaan!";
        case "Password is invalid!":
            return "Wachtwoord is niet toegestaan!";
        case "User already exists!":
            return "Gebruikersnaam is in gebruik!";
        default:
            return error;
    }
}

function validatePassword(password) {
    let errors = [];

    if (password.length < 8) {
        errors.push("Wachtwoord moet minimaal 8 karakters zijn!");
    }

    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;
    for (let i = 0; i < password.length; i++) {
        const chr = password[i];

        if (chr.toUpperCase() != chr.toLowerCase()) {
            if (chr == chr.toUpperCase()) hasUppercase = true;
            else hasLowercase = true;
        } else if (chr.match("[0-9]") > 0) hasNumber = true;
        else hasSpecialCharacter = true;
    }

    if (!hasUppercase) errors.push("Wachtwoord moet een hoofdletter bevatten!");
    if (!hasLowercase)
        errors.push("Wachtwoord moet een kleine letter bevatten!");
    if (!hasNumber) errors.push("Wachtwoord moet een nummer bevatten!");
    if (!hasSpecialCharacter)
        errors.push("Wachtwoord moet een speciaal karakter bevatten!");

    return errors;
}

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const prevPath =
        location.state && location.state.prevPath
            ? location.state.prevPath
            : "/";

    function handleRegister() {
        if (username.trim().length == 0) {
            setErrors(["Gebruikersnaam is verplicht!"]);
            return;
        }
        if (password.length == 0) {
            setErrors(["Wachtwoord is verplicht!"]);
            return;
        }
        const errors = validatePassword(password);
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        UserService.register(username, password)
            .then(() => {
                navigate(prevPath);
            })
            .catch((error) => {
                setErrors([translateError(error)]);
            });
    }

    if (UserService.isLoggedIn()) return <Navigate to={prevPath} />;

    return (
        <>
            <div className="register-form">
                <div className="register-input">
                    <InputField
                        label="Gebruikersnaam"
                        text={username}
                        onTextChanged={setUsername}
                        onSubmit={handleRegister}
                    />
                    <InputField
                        label="Wachtwoord"
                        text={password}
                        onTextChanged={setPassword}
                        hidden={true}
                        onSubmit={handleRegister}
                    />
                </div>
                {errors.length > 0 ? (
                    <div className="text-center text-[#F00] font-bold">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                ) : null}
                <Button
                    text={"Registreer"}
                    onClick={handleRegister}
                    isLoginOrOut={true}
                />
            </div>
        </>
    );
}

export default Register;
