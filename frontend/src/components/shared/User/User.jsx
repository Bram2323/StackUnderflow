import UserIcon from "../../../assets/images/user-icon.svg";
import "./User.css";


function User({ user }) {
    return ( <>
        <div className="user-container">
            <img className="w-[30px] h-[30px]" src={UserIcon}></img>
            <p className="mt-[2px]">{user.username}</p>
        </div>
    </> );
}

export default User;