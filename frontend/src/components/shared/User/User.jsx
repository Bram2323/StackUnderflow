import UserIcon from "../../../assets/images/user-icon.svg";
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
    };
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
            </div>
        </>
    );
}

export default User;
