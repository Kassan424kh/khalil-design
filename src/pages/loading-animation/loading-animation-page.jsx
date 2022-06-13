import "./styles.sass";
import { useState } from "react";
import TabsPage from "../../components/tabs/tabs-pages/tabs-page/tabs-page";
import TabsPages from "../../components/tabs/tabs-pages/tabs-pages";
import TabsSwitcher from "../../components/tabs/tabs-switcher/tabs-switcher";
import InfosCard from "../../components/infos-card/infos-card";

const LoadingAnimationPage = () => {
    const infosObject = {
        id: "4",
        headline: "headline",
        //subHeadline: "subHeadline",
        firstname: "firstname",
        lastname: "lastname",
        function: "function",
        areaOfResponsibility: "areaOfResponsibility",
        telephoneNumber: "telephoneNumber",
        emailAddress: "emailAddress",
        handlingkarteiId: "8"
    };

    const translationObject = {
        firstnameAndLastname: "Vor- and Lastname",
        function: "Funktion",
        areaOfResponsibility: "Area Of Responsibility",
        telephoneNumber: "Telephone Number",
        emailAddress: "Email"
    };

    return (
        <div className="page infos-card-page">
            <InfosCard
                infosObject={infosObject}
                translationObject={translationObject}
            />
        </div>
    );
};

export default LoadingAnimationPage;
