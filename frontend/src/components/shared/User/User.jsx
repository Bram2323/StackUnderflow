import UserIcon from "../../../assets/images/user-icon.svg";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./User.css";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";

function getAward(award) {
    if (award == undefined) return <></>;
    award = award.toLowerCase();
    if (award == "first")
        return <FontAwesomeIcon icon={faAward} className=" text-amber-400" />;
    if (award == "second")
        return <FontAwesomeIcon icon={faAward} className=" text-stone-400" />;
    if (award == "third")
        return <FontAwesomeIcon icon={faAward} className=" text-[#cc7e31]" />;

    return <></>;
}

function User({ user, className = "" }) {
    const navigate = useNavigate();

    return (
        <>
            <div
                className={
                    " user-container " +
                    (user.isAdmin ? "admin" : "") +
                    className
                }
                onClick={(e) => {
                    e.stopPropagation();
                    if (
                        UserService.isLoggedIn() &&
                        UserService.getUser().username == user.username
                    ) {
                        navigate("/");
                    } else {
                        navigate("/gebruikers/" + user.username);
                    }
                }}
            >
                <img className=" w-[30px] h-[30px]" src={UserIcon}></img>
                <p>{user.username}</p>
                {getAward(user.award)}
            </div>
        </>
    );
}

export default User;
