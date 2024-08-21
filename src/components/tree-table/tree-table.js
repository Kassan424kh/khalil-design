import React, { useContext, useEffect, useRef, useState } from "react";
import TableBackgroundGradientColorImage from "../../images/table-gradient-background-image.png";
import "./tree-table.sass"
import { TreeTableContext } from "../../pages/tree-table/tree-table-page";


const TreeTable = ({
    setExpandAllRows, onScrollTable, data
}) => {
    return <>
        <div className="tree-table-headline">
            <div className={"tree-table-headline-text-content"}>
                {["customer", "productFamily", "product", "productVariant", "campaign"].map((column, index) => {
                    return (
                        <>
                            {Boolean(index) && <span className="material-symbols-outlined">navigate_next</span>}
                            <p>{column}</p>
                        </>
                    );
                })}
            </div>
            <div className="tree-table-headline-action-button">
                <button onClick={() => setExpandAllRows(true)}>Expand All</button>
                <button onClick={() => setExpandAllRows(false)}>Collapse All</button>
            </div>
        </div>
        <div className={"tree-table"} id="tabletest">
            <div className="tree-table-content" onScroll={onScrollTable}>
                <ul className={"tree-table-list"}>
                    {data.map((row) => {
                        return <TreeTableRow rows={data} {...row} />;
                    })}
                </ul>
            </div>
        </div>
    </>
}

export default TreeTable

const TreeTableRow = ({
    headline,
    subRows,
    rows,
    type,
    getHeight,
    parentSubRowsLength,
    subRowsType = "row",
    index = 0,
    isSubRow = false,
    isSticky = true,
    stickyIndex = 0,
    parentOpen = false,
    ...props
}) => {
    const [open, setOpen] = useState(parentOpen && (rows.length === 1 || subRowsType !== "row"));
    const ref = useRef();
    const { expandAllRows, setExpandAllRows } = useContext(TreeTableContext);

    useEffect(() => {
        if (expandAllRows !== null) setOpen(expandAllRows);
    }, [expandAllRows]);

    return (
        <li
            ref={ref}
            className={`tree-table-list-row ${!index ? "main-row" : `sub-row-${index}`}${isSticky ? ` sticky-row-${stickyIndex}` : ""}${open ? " open" : ""
                }`}
            style={{
                maxHeight: open ? `${100000}px` : "50px",
            }}
        >
            <div
                className={"tree-table-list-row-headline"}
                onClick={() => {
                    const nextOpen = !open
                    setOpen(nextOpen);
                    setExpandAllRows(null);
                }}
            >
                <div className={"tree-table-list-row-headline-left"}>
                    <span className={"material-symbols-outlined expand-more"}>{"chevron_right"}</span>
                    <p>{headline}</p>
                </div>
                <div className="tree-table-list-row-headline-right">
                    <span className="material-symbols-outlined more-action-button">more_vert</span>
                </div>
            </div>
            {open ?
                (subRowsType === "row" ? (
                    subRows.map((subRow) => {
                        return (
                            <TreeTableRow
                                rows={subRows}
                                isSubRow
                                {...subRow}
                                index={index + 1}
                                stickyIndex={isSticky ? stickyIndex + 1 : stickyIndex}
                                parentOpen={open}
                            />
                        );
                    })
                ) : (
                    <TreeTableTable rows={subRows} stickyIndex={isSticky ? stickyIndex + 1 : stickyIndex}
                        open={open} />
                ))
                : null
            }
        </li>
    );
};

const TreeTableTable = ({ rows, stickyIndex }) => {
    const ref = useRef();
    const headlineTexts = [
        { key: "IdCampaign", text: "campaignId" },
        { key: "Campaign", text: "campaign" },
        { key: "start", text: "start" },
        { key: "end", text: "end" },
    ];


    return (
        <div className={"tree-table-list-table"} key={rows[0][headlineTexts[0]] + rows[0][headlineTexts[1]]}
            style={{
                backgroundImage: `url(${TableBackgroundGradientColorImage})`
            }}>
            <table ref={ref} className={`tree-table-list-row sub-row-4 sticky-row-${stickyIndex}`}>
                <thead>
                    <tr className={"tree-table-list-row-headline table-headline"} style={{
                        backgroundImage: `url(${TableBackgroundGradientColorImage})`
                    }}>
                        {headlineTexts.map((tableHeaders, idx) => {
                            return <th key={"ad" + tableHeaders.text + idx}>{tableHeaders.text}</th>;
                        })}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex + "rowIndex"}>
                                {headlineTexts.map((obj, idx) => {
                                    console.log(row)
                                    if (obj.key === "Campaign")
                                        return <td>
                                            <div>
                                                {row[obj.key]}
                                            </div>
                                        </td>

                                    return <td key={idx + obj.key}>{row[obj.key]}</td>;
                                })}
                                <td>
                                    <div className={""} key={rowIndex + "rowIndexdiv"}>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


        </div>
    );
};
