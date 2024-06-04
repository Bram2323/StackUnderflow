import InputField from "../InputField/InputField";
import UserIcon from "../../../assets/images/user-icon.svg";
import "./User.css";


function User({ username }) {
    return ( <>
        <div className="user-container">
            <img className="w-[30px] h-[30px]" src={UserIcon}></img>
            <p className="mt-[2px]">{username}</p>
        </div>
    </> );
}

export default User;