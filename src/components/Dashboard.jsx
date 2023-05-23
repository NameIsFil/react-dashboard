import { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup} from "@mui/material";

export function Dashboard() {
    const [formats, setFormats] = useState();
    const [dashboardView, setDashboardView] = useState();
    const postsView = 1;
    const photoGalleryView = 2;

    function handleFormatChange(event, newFormat) {
        setFormats(newFormat);
        console.log(newFormat);
    }

    function onClickOpenTab(number) {
        if(dashboardView === number) {
            setDashboardView(null)
        } else {
            setDashboardView(number)
        }
    }

    return (
        <div>
            <ToggleButtonGroup value={formats} exclusive onChange={handleFormatChange}>
                <ToggleButton value="1" variant="contained" onClick={ () => onClickOpenTab(postsView) }>
                    Posts
                </ToggleButton>
                <ToggleButton value="2" variant="contained" onClick={ () => onClickOpenTab(photoGalleryView) }>
                    Photos
                </ToggleButton>
            </ToggleButtonGroup>
            {dashboardView === 1 ? <UserDashboard props={1}/> : <></> }
            {dashboardView === 2 ? <UserDashboard props={2}/> : <></> }
        </div>
    )
}

function UserDashboard(props) {
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

function UserPostsList(props) {
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
};

function UserPhotosList(props) {
    const [albumsData, setAlbumsData] = useState();
    const userId = props.userId;

    useEffect(() => {
        async function fetchData() {
            const [albumsResponse] =
                await Promise.all([
                    fetch(
                        'https://jsonplaceholder.typicode.com/photos?albumId=' + userId,
                    )
                ]);
            const [albums] = await Promise.all([
                albumsResponse.json(),
            ]);

            setAlbumsData(albums);
        }
        fetchData();
    }, [userId]);

    if (!albumsData) {
        return null;
    }
    return albumsData.map((album) => (
        <img key={album.id} src={album.url} alt={album.title}/>
    ));
};


