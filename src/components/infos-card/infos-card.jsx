import { cloneElement } from "react";
import "./styles.sass";

const InfosCard = ({
    infosObject,
    translationObject,
    className,
    editComponent
}) => {
    return (
        <div className={`infos-card${className ? " " + className : ""}`}>
            {editComponent
                ? cloneElement(editComponent, { infosObject: infosObject })
                : null}
            <div
                className={`infos-card-headline ${
                    infosObject.subHeadline ? "with-sub-headline" : ""
                }`}
            >
                <span>{infosObject.headline ? infosObject.headline : "-"}</span>
                {infosObject.subHeadline ? (
                    <small>( {infosObject.subHeadline})</small>
                ) : null}
            </div>
            <div className="infos-card-data">
                {Object.entries(translationObject)
                    .map(([dataKey, dataValue]) => [
                        dataValue,
                        infosObject[dataKey]
                    ])
                    .map(([k, v], index) => {
                        return (
                            <div style={{ display: "contents" }} key={index}>
                                <div className={`data-header-text`}>{k}:</div>
                                <div
                                    className={`data-value ${
                                        index ===
                                        Object.keys(translationObject).length -
                                            1
                                            ? "last"
                                            : ""
                                    }`}
                                >
                                    {v ? v : "-"}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default InfosCard;
