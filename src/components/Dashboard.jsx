import { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup} from "@mui/material";
import { UserDashboard } from "./UserDashboard.jsx";

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


