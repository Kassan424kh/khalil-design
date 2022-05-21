import "./pages.sass";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Error404Page from "./404/error-404-page";
import Tabs from "./tabs/tabs-page";

const Pages = () => {
    return (
        <Routes>
            <Route exact path={"/tabs"} element={<Tabs />} />
            <Route path="*" element={<Error404Page />} />
        </Routes>
    );
};

export default Pages;
