import "./pages.sass";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Error404Page from "./404/error-404-page";
import Tabs from "./tabs/tabs-page";
import ButtonPage from "./button/button-page";
import InfosCardPage from "./infos-card/infos-card-page";

const Pages = () => {
    return (
        <Routes>
            <Route exact path={"/tabs"} element={<Tabs />} />
            <Route exact path={"/button"} element={<ButtonPage />} />
            <Route exact path={"/infos-card"} element={<InfosCardPage />} />
            <Route path="*" element={<Error404Page />} />
        </Routes>
    );
};

export default Pages;
