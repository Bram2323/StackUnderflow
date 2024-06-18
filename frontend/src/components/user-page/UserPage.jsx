import { useEffect, useState } from "react";
import UserInfo from "../shared/user-info/UserInfo";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import User from "../shared/User/User";

function UserPage() {
    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        ApiService.get("users/name/" + username).then((response) => {
            setUser(response.data);
        });
    }, [username]);

    if (user == null) return <></>;

    return (
        <>
            <div className="flex flex-col w-3/5 gap-3 mb-12">
                <UserInfo user={user} showAskQuestion={false} />
            </div>
        </>
    );
}

export default UserPage;
