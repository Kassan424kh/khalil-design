import React, { useRef } from "react";
import { useContainerDimensions } from "../../../services/useContainerDimensions";
import "./styles.sass";

import ProfileImage from "/public//profile-image.png";

const NavUser = (props) => {
    return (
        <div className={`cht-user  ${props.open ? "open" : ""}`}>
            <div
                className={`cht-user-image`}
                style={{ backgroundImage: `url(${ProfileImage})` }}
            />
            <div className={"cht-user-name"}>
                {props.userName
                    ? props.userName.split(".").map((nameTile, index) => {
                          return (
                              <Name
                                  index={index}
                                  nameTile={nameTile}
                                  open={props.open}
                              />
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};

const Name = ({ index, nameTile, open }) => {
    const keys = {
        openNameTile: (index + 1) * (index + 1),
        closedFirstChar: (index + 2) * (index + 1),
        nameTile: (index + 3) * (index + 1)
    };

    const nameRef = useRef([]);

    const { width: nameTileWidth, height: _ } = useContainerDimensions({
        ref: nameRef,
        id: keys.openNameTile,
        withoutResize: true,
        withoutScroll: true
    });
    const { width: firstCharWidth, height: __ } = useContainerDimensions({
        ref: nameRef,
        id: keys.closedFirstChar,
        withoutResize: true,
        withoutScroll: true
    });

    return (
        <>
            <div
                key={keys.openNameTile}
                ref={(el) => (nameRef.current[keys.openNameTile] = el)}
                className={`cht-user-name-tile`}
                style={{
                    fontSize: "20px",
                    opacity: 0,
                    position: "absolute"
                }}
            >
                {nameTile}{" "}
            </div>
            <div
                key={keys.closedFirstChar}
                ref={(el) => (nameRef.current[keys.closedFirstChar] = el)}
                className={`cht-user-name-tile`}
                style={{
                    fontSize: "12px",
                    opacity: 0,
                    position: "absolute"
                }}
            >
                {nameTile.split("")[0]}
            </div>
            <div
                key={keys.nameTile}
                className={`cht-user-name-tile`}
                style={{
                    maxWidth: open ? nameTileWidth : firstCharWidth - 0.1
                }}
            >
                {nameTile}{" "}
            </div>
        </>
    );
};

export default NavUser;
