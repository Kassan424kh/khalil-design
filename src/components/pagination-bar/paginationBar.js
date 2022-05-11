import React, { useEffect, useState } from "react";
import Button from "../button/button";
import Select from "../select/select";
import "./styles.sass";

const PaginationBar = (props) => {
    const rowsIndexArray = [5, 10, 25, 50, 100, 200];
    const [rowsLength, setRowsLength] = useState(5);

    useEffect(() => {
        if (props.onSetRowsLength) props.onSetRowsLength(rowsLength);
    }, [rowsLength]);

    return (
        <div className="pagination-bar">
            <div className={"pagination-bar-content"}>
                <div>
                    <Button
                        className={"icon-button"}
                        primary
                        grey
                        leftIcon={"keyboard_double_arrow_left"}
                        disabled={props.currentPage === 1}
                        onClick={() => {
                            props.setCurrentPage(1);
                        }}
                    />
                    <Button
                        className={"icon-button"}
                        primary
                        grey
                        leftIcon={"keyboard_arrow_left"}
                        disabled={props.currentPage === 1}
                        onClick={() => {
                            if (props.currentPage > 1)
                                props.setCurrentPage(props.currentPage - 1);
                        }}
                    />
                </div>
                <div>
                    <Select
                        onSelect={(option) => {
                            if (option && option.length)
                                setRowsLength(option[1]);
                        }}
                        options={rowsIndexArray}
                    >
                        <Button outlined grey rightIcon={"arrow_drop_down"}>
                            {rowsLength} rows
                        </Button>
                    </Select>
                    <p>
                        {props.currentPage}-{props.pagesLength}
                    </p>
                </div>
                <div>
                    <Button
                        className={"icon-button"}
                        primary
                        grey
                        leftIcon={"keyboard_arrow_right"}
                        disabled={props.currentPage === props.pagesLength}
                        onClick={() => {
                            if (props.currentPage < props.pagesLength)
                                props.setCurrentPage(props.currentPage + 1);
                        }}
                    />
                    <Button
                        className={"icon-button"}
                        primary
                        grey
                        leftIcon={"keyboard_double_arrow_right"}
                        disabled={props.currentPage === props.pagesLength}
                        onClick={() => {
                            props.setCurrentPage(props.pagesLength);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaginationBar;
