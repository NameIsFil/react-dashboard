import { useState, useEffect } from 'react';

export function Dashboard() {
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

    if (!usersData) {
        return null;
    }

    return (
        <div>
            {usersData.map((user) =>
                <button onClick={ () => props.handleClick(user.id) } key={ user.id }>{ user.name }</button>
            )}
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

