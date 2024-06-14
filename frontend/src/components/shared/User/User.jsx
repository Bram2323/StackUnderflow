import UserIcon from "../../../assets/images/user-icon.svg";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./User.css";

function getStyle(scale) {
    return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5 * scale,
        fontSize: `${120 * scale}%`,
        border: "1px solid black",
        padding: `0px ${5 * scale}px`,
        height: 40 * scale,
        borderRadius: 10 * scale,
        backgroundColor: "white",
    };
}

function getAward(award) {
    award = award.toLowerCase();
    if (award == "first")
        return <FontAwesomeIcon icon={faAward} className=" text-amber-400" />;
    if (award == "second")
        return <FontAwesomeIcon icon={faAward} className=" text-stone-400" />;
    if (award == "third")
        return <FontAwesomeIcon icon={faAward} className=" text-[#cc7e31]" />;

    return <></>;
}

function User({ user, scale = 1 }) {
    return (
        <>
            <div style={getStyle(scale)}>
                <img
                    style={{ width: 30 * scale, height: 30 * scale }}
                    src={UserIcon}
                ></img>
                <p>{user.username}</p>
                {getAward(user.award)}
            </div>
        </>
    );
}

export default User;
