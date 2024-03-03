import {Outlet} from "react-router-dom";
import {Header} from "../components";
import {GenreShow} from "../components/Header/GenreShow";



const MainLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};