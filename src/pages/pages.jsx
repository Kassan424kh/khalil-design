import "./pages.sass";
import { Route, Routes } from "react-router-dom";
import Error404Page from "./404/error-404-page";
import Tabs from "./tabs/tabs-page";
import ButtonPage from "./button/button-page";
import InfosCardPage from "./infos-card/infos-card-page";
import FloatingActionButtonsPage from "./floating-action-buttons/floating-action-buttons-page";
import ModalPage from "./modal/modal-page";
import SelectPage from "./select/select-page";
import TextfieldPage from "./textfield/textfield-page";
import RichTextfieldPage from "./rich-textfield/rich-textfield-page";

const Pages = () => {
    return (
        <Routes>
            <Route exact path={"/"} element={<SelectPage />} />
            <Route exact path={"/tabs"} element={<Tabs />} />
            <Route exact path={"/button"} element={<ButtonPage />} />
            <Route exact path={"/infos-card"} element={<InfosCardPage />} />
            <Route exact path={"/modal"} element={<ModalPage />} />
            <Route exact path={"/select"} element={<SelectPage />} />
            <Route exact path={"/textfield"} element={<TextfieldPage />} />
            <Route
                exact
                path={"/rich-textfield"}
                element={<RichTextfieldPage />}
            />
            <Route
                exact
                path={"/floating-action-buttons"}
                element={<FloatingActionButtonsPage />}
            />
            <Route path="*" element={<Error404Page />} />
        </Routes>
    );
};

export default Pages;
