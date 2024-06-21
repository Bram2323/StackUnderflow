import { useEffect, useState } from "react";
import UserInfo from "../shared/user-info/UserInfo";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import User from "../shared/user/User";

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
            <div className="flex flex-col max-w-[800px] w-[90%] gap-3 mb-12">
                <UserInfo user={user} showAskQuestion={false} />
            </div>
        </>
    );
}

export default UserPage;
