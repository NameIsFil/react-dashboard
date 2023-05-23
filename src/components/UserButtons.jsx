import {useEffect, useState} from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

export function UserButtons(props) {
    const [usersData, setUsersData] = useState();
    const [formats, setFormats] = useState();

    useEffect(() => {
        async function fetchData() {
            const [usersResponse] =
                await Promise.all([
                    fetch(
                        'https://jsonplaceholder.typicode.com/users',
                    )
                ]);
            const [users] = await Promise.all([
                usersResponse.json(),
            ]);

            setUsersData(users);
        }
        fetchData();
    }, []);

    function handleFormatChange(event, newFormat) {
        setFormats(newFormat);
        console.log(newFormat);
    }

    if (!usersData) {
        return null;
    }

    return (
        <div>
            <ToggleButtonGroup value={formats} exclusive onChange={handleFormatChange}>
                {usersData.map((user) =>
                    <ToggleButton value={user.id} variant="contained" onClick={ () => props.handleClick(user.id) } key={ user.id }>{ user.name }</ToggleButton>
                )}
            </ToggleButtonGroup>
        </div>
    )
}