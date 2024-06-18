import UserIcon from "../../../assets/images/user-icon.svg";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./User.css";

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

function User({ user }) {
    return (
        <>
            <div className={"user-container " + (user.isAdmin && "admin")}>
                <img className=" w-[30px] h-[30px]" src={UserIcon}></img>
                <p>{user.username}</p>
                {getAward(user.award)}
            </div>
        </>
    );
}

export default User;
