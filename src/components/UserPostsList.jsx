import {useEffect, useState} from "react";

export function UserPostsList(props) {
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