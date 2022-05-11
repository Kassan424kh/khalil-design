import "./styles.sass";
import React from "react";
import TvToolLogoSmall from "/public/TV-Tool-render-small.png";

const NavLogo = (props) => {
    return (
        <div
            className={`tv-tool-logo ${props.open ? "open" : ""}`}
            style={{ backgroundImage: `url(${TvToolLogoSmall})` }}
        >
            <h3>TV-Tool</h3>
        </div>
    );
};

export default NavLogo;
