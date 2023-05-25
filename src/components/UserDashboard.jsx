import { useState } from 'react';
import {UserButtons} from "./UserButtons.jsx";
import { UserPostsList } from "./UserPostsList.jsx";
import { UserPhotosList } from "./UserPhotosList.jsx";

export function UserDashboard(props) {
    const [userId, setUserId] = useState(null);

    function handleOnClick(i) {
        if(userId === i) {
            setUserId(null)
        } else {
            setUserId(i)
        }
    }

    return (
        <div>
            <UserButtons handleClick={handleOnClick}/>
            {props.props === 2 && userId !== null ? <UserPhotosList userId={ userId } /> : null}
            {props.props === 1 && userId !== null ? <UserPostsList userId={ userId } /> : null}
        </div>
    )
}