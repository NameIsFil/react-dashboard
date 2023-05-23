import {useEffect, useState} from "react";

export function UserPhotosList(props) {
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
