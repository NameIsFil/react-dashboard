import { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup} from "@mui/material";


export function Dashboard() {
    const [formats, setFormats] = useState();
    const [dashboardView, setDashboardView] = useState();

    useEffect((dashboardView) => {
        if(dashboardView === 1) {
            return (
                <div>
                    <PostsDashboard />
                </div>
            )
        }
        if(dashboardView === 2) {
            return (
                <div>
                    <PhotoGallery />
                </div>
            )
        }
    }, [dashboardView]);

    function handleFormatChange(event, newFormat) {
        setFormats(newFormat);
        console.log(newFormat);
    }

    function handleOnClick(number) {
        setDashboardView(number)
    }

    return (
        <div>
            <ToggleButtonGroup value={formats} exclusive onChange={handleFormatChange}>
                <ToggleButton value="1" variant="contained" onClick={ () => handleOnClick(1) }>
                    Posts
                </ToggleButton>
                <ToggleButton value="2" variant="contained" onClick={ () => handleOnClick(2) }>
                    Photos
                </ToggleButton>
            </ToggleButtonGroup>
        </div>

    )
}

function PhotoGallery() {

}

function PostsDashboard() {
    const [userId, setUserId] = useState(null);

    function handleOnClick(i) {
        setUserId(i);
    }

    return (
        <div>
            <UserButtons handleClick={handleOnClick}/>
            {userId !== null ? <UserPosts userId={ userId } /> : null}
        </div>
    )
}

function UserButtons(props) {
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

function UserPosts(props) {
    const [postsData, setPostsData] = useState();
    const userId = props.userId;

    useEffect(() => {
        async function fetchData() {
            const [postsResponse] =
                await Promise.all([
                    fetch(
                        'https://jsonplaceholder.typicode.com/posts?userId=' + userId,
                    )
                ]);
            const [posts] = await Promise.all([
                postsResponse.json(),
            ]);

            setPostsData(posts);
        }
        fetchData();
    }, [userId]);

    if (!postsData) {
        return null;
    }
    return postsData.map((post) => (
        <p key={ post.id }>{ post.title }</p>
    ));
}

