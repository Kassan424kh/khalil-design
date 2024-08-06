import "./calendartable.sass"
import React, {useEffect, useRef, useState} from "react";
import Select from "../select/select";

const _ = require('lodash');

export const dummy_calendar_table_data = [
    {
        label: "digital XYZ", dates: [{start: "01-01-2024", end: "31-12-2024"}], subRows: [
            {
                label: "subbriefing_1", dates: [
                    {start: "05-01-2024", end: "10-01-2024"},
                    {start: "20-05-2024", end: "12-08-2024"},
                    {start: "11-09-2024", end: "07-10-2024"}
                ], ojbect: {}
            },
            {
                label: "subbriefing_2", dates: [
                    {start: "17-11-2024", end: "09-12-2024"}
                ], ojbect: {}
            },
            {
                label: "subbriefing_3", dates: [
                    {start: "11-01-2024", end: "05-02-2024"}
                ], ojbect: {}
            },
        ],
    },
    {
        label: "Radio", dates: [{start: "01-03-2024", end: "10-06-2024"}], subRows: [
            {label: "subbriefing_1", dates: [{start: "01-03-2024", end: "16-04-2024"}], ojbect: {}},
            {label: "subbriefing_2", dates: [{start: "18-05-2024", end: "30-05-2024"}], ojbect: {}},
            {label: "subbriefing_2", dates: [{start: "18-05-2024", end: "30-05-2024"}], ojbect: {}},
            {label: "subbriefing_2", dates: [{start: "18-05-2024", end: "30-05-2024"}], ojbect: {}},
            {label: "subbriefing_3", dates: [{start: "02-12-2024", end: "10-12-2024"}], ojbect: {}},
        ],
    },
    {
        label: "TV", dates: [{start: "18-05-2024", end: "30-05-2024"}], subRows: [
            {label: "subbriefing_1", dates: [{start: "01-03-2024", end: "16-04-2024"}], ojbect: {}},
            {label: "subbriefing_1", dates: [{start: "01-03-2024", end: "16-04-2024"}], ojbect: {}},
            {label: "subbriefing_1", dates: [{start: "01-03-2024", end: "16-04-2024"}], ojbect: {}},
            {label: "subbriefing_1", dates: [{start: "01-03-2024", end: "16-04-2024"}], ojbect: {}},
            {label: "subbriefing_2", dates: [{start: "18-05-2024", end: "30-05-2024"}], ojbect: {}},
            {label: "subbriefing_3", dates: [{start: "02-12-2024", end: "10-12-2024"}], ojbect: {}},
        ],
    },
];

const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const getDaysInYearSplitIntoWeeks = (year) => {
    // Determine if the year is a leap year
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const daysInYear = isLeapYear(year) ? 366 : 365;
    const months = {};
    let currentWeek = 1;
    let currentDate = new Date(year, 0, 1, 0, 0, 0);

    for (let i = 0; i < daysInYear; i++) {
        const dayDate = new Date(currentDate)

        const dayName = daysOfWeek[dayDate.getDay()]
        const dayDateString = (() => {
            const nextDay = new Date()
            nextDay.setDate(currentDate.getDate())
            return nextDay
        })().toISOString().split('T')[0]
        const month = dayDate.getMonth()
        const monthName = monthsOfYear[month]

        // if there is no exist month, then add it and create the first week and first day inside
        if (!Object.keys(months).length || !months[monthName]) {
            months[monthName] = {
                [currentWeek]: [
                    {
                        date: dayDate,
                        dayDateString: dayDateString,
                        dayName: dayName
                    }
                ]
            }
        } else {
            // if this week is not exist, then add included the first day inside
            if (!months[monthName][currentWeek])
                months[monthName][currentWeek] = [{
                    date: dayDate,
                    dayDateString: dayDateString,
                    dayName: dayName
                }]
            else
                // add day to the current week
                months[monthName][currentWeek].push({
                    date: dayDate,
                    dayDateString: dayDateString,
                    dayName: dayName
                })

        }

        // update currentDate with next Date

        currentDate.setDate(currentDate.getDate() + 1);


        // if the current day name was Monday, then expand the current week with 1
        if (dayName === "SU")
            currentWeek++
    }

    return months;
}

const CalendarTable = (
    {
        onClick,
        contextMenuOptions,
        onSelect,
        data
    }
) => {
    const year = 2024
    const [viewMode, setViewMode] = useState("MONTHS") // DAYS, WEEKS, MONTHS
    const [months,] = useState(getDaysInYearSplitIntoWeeks(year))
    const [allWeeks,] = useState(Object.entries(_.cloneDeep(months))?.reduce((prevObj, [monthName, weeks]) => {
        Object.keys(prevObj).forEach((weekNumber) => {
            if (Object.keys(weeks).includes(weekNumber))
                weeks[weekNumber] = [...prevObj[weekNumber], ...weeks[weekNumber]]
        })

        return {...prevObj, ...weeks}
    }, {}))

    const viewModes = ["MONTHS", "WEEKS", "DAYS", "DAY_NAMES"]

    const [openSubRows, setOpenSubRows] = useState([])

    const [callOnSelect, setCallOnSelect] = useState()
    useEffect(() => {
        if (callOnSelect) {
            onSelect(
                {
                    selectedOption: callOnSelect.selectedOption,
                    clickedMouseButton: callOnSelect.clickedMouseButton,
                    cellData: callOnSelect.cellData,
                    rowData: callOnSelect.rowData,
                }
            )
            setCallOnSelect()
        }
    }, [callOnSelect])

    const handleOnSelect = (data, rowData) => setCallOnSelect({...data, rowData: rowData})

    return (<div className={"calendar-table-container"}>
            <div className="center">
                <div className={"view-mode"}>
                    {
                        viewModes.map((_viewMode) => {
                            return <button
                                className={`view-mode-button${viewMode === _viewMode ? " active" : ""}`}
                                onClick={() => {
                                    setViewMode(_viewMode)
                                }}>
                                {_viewMode.replace("_", " ")}
                            </button>
                        })
                    }
                </div>
            </div>

            <div className="calendar-tables">
                <div className="table-border">

                    <table className="data-table">
                        <thead>
                        {[...Array(viewModes.findIndex(vm => vm === viewMode) + 1)].map((viewMode, index) => {
                            return <tr>
                                <th>{viewModes[index]}</th>
                            </tr>
                        })}
                        </thead>
                        <tbody>
                        {
                            data.map(({label, subRows}, rowIndex) => {
                                return <>
                                    <tr onClick={() => {
                                        if (subRows && subRows.length) {
                                            setOpenSubRows(currentOpenSubRows => {
                                                if (currentOpenSubRows.includes(rowIndex)) {
                                                    return currentOpenSubRows.filter(openSubRow => openSubRow !== rowIndex)
                                                } else {
                                                    return [...currentOpenSubRows, rowIndex]
                                                }
                                            })
                                        }
                                    }}>
                                        <td className={subRows && subRows.length ? "main-row" : ""}>
                                            <p>{Boolean(subRows && subRows.length) &&
                                                <span
                                                    className="material-symbols-outlined">{openSubRows.includes(rowIndex) ? "keyboard_arrow_down" : "chevron_right"}</span>}
                                                {label}</p>
                                        </td>
                                    </tr>
                                    {Boolean(subRows && subRows.length && openSubRows.includes(rowIndex)) && subRows.map(({label}) => {
                                        return <tr className={"sub-row"}>
                                            <td>{label}</td>
                                        </tr>
                                    })}
                                </>
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <div className="table-border">
                    <table className="calendar-table">
                        <thead>
                        <tr>
                            {Object.entries(months)?.map(([month, weeks], monthIndex) => {
                                const weeksLength = Object.keys(months[month]).length
                                const daysLength = Object.values(weeks).reduce((prevCount, week) => {
                                    return prevCount + week.length
                                }, 0)
                                return <th key={monthIndex} colSpan={(() => {
                                    switch (viewMode) {
                                        case "MONTHS":
                                            return 1
                                        case "WEEKS":
                                            return weeksLength
                                        case "DAYS":
                                            return daysLength
                                        case "DAY_NAMES":
                                            return daysLength
                                    }
                                })()}>
                                    {month}
                                </th>
                            })}
                        </tr>
                        {
                            Boolean(["WEEKS", "DAYS", "DAY_NAMES"].includes(viewMode)) && <>
                                <tr>
                                    {Object.entries(months)?.map(([month, weeks], monthIndex) => {

                                        const prevMonth = Object.entries(months)[monthIndex - 1]
                                        const [prevMonthLastWeekNumber, prevMonthLastWeekDays] = Object.entries(prevMonth?.at(1) ?? {})?.at(-1) ?? [undefined, undefined]
                                        const nextMonth = Object.entries(months)[monthIndex + 1]
                                        const [nextMonthFirstWeekNumber, nextMonthFirstWeekDays] = Object.entries(nextMonth?.at(1) ?? {})?.at(0) ?? [undefined, undefined]

                                        return Object.entries(weeks).map(([weekNumber, days], weekIndex) => {
                                            return Boolean((viewMode === "WEEKS" && weekNumber !== prevMonthLastWeekNumber) || viewMode !== "WEEKS") && (Boolean(weekNumber !== prevMonthLastWeekNumber || viewMode === "WEEKS") &&
                                                <th className={"week"} key={weekIndex}
                                                    colSpan={(() => {
                                                        switch (viewMode) {
                                                            case "WEEKS":
                                                                return weekNumber === nextMonthFirstWeekNumber ? 2 : weeks.length
                                                            case "DAYS":
                                                                return weekNumber !== prevMonthLastWeekNumber ? allWeeks[Number(weekNumber)].length : 0
                                                            case "DAY_NAMES":
                                                                return weekNumber !== prevMonthLastWeekNumber ? allWeeks[Number(weekNumber)].length : 0
                                                        }
                                                    })()}>
                                                    {weekNumber}
                                                </th>)
                                        })
                                    })}
                                </tr>
                                {
                                    Boolean(["DAYS", "DAY_NAMES"].includes(viewMode)) && [...Array(viewMode === "DAY_NAMES" ? 2 : 1)].map((_, rowIndex) => {
                                        return <tr>
                                            {Object.entries(months)?.map(([month, weeks], monthIndex) => {
                                                    const [, prevMonthWeeks] = Object.entries(months)[monthIndex - 1] ?? [undefined, undefined]
                                                    const [, nextMonthWeeks] = Object.entries(months)[monthIndex + 1] ?? [undefined, undefined]
                                                    return Object.entries(weeks).reduce((prevDays, [weekNumber, days]) => {
                                                        const [numberOfLastWeekInPrevMonth, _] = Object.entries(prevMonthWeeks ?? {}).at(-1) ?? [undefined, undefined]

                                                        return [...prevDays, ...(weekNumber !== numberOfLastWeekInPrevMonth ? allWeeks[Number(weekNumber)] : [])]
                                                    }, []).map((day, dayIndex) => {
                                                        return <th className={"week"} key={dayIndex}>
                                                            {rowIndex === 1 ? day.dayName : day.dayDateString.split("-")[2]}
                                                        </th>
                                                    })
                                                }
                                            )}
                                        </tr>
                                    })
                                }
                            </>
                        }

                        </thead>
                        <tbody>
                        {
                            data.map((row, rowIndex) => {
                                const {label, dates, subRows} = row
                                return <CalendarTableRow
                                    months={months}
                                    viewMode={viewMode}
                                    allWeeks={allWeeks}
                                    dates={dates.map(({start, end}) => {
                                        const startDate = start.split("-").map(Number)
                                        const endDate = end.split("-").map(Number)

                                        const rowStartDate = new Date(startDate[2], startDate[1] - 1, startDate[0], 0, 0, 0)
                                        const rowEndDate = new Date(endDate[2], endDate[1] - 1, endDate[0], 0, 0, 0)

                                        return {start: rowStartDate, end: rowEndDate}
                                    })}
                                    subRows={subRows}
                                    rowIndex={rowIndex}
                                    openSubRows={openSubRows}
                                    contextMenuOptions={contextMenuOptions}
                                    onClick={(data) => {
                                        if (typeof onClick === "function")
                                            onClick({
                                                ...data, rowData: (data?.rowData ? {
                                                    ...data.rowData,
                                                    parentData: row
                                                } : {type: "row", data: row})
                                            })
                                    }}
                                    onSelect={(d) => handleOnSelect(d, (d?.rowData ? {
                                        ...d.rowData,
                                        parentData: row
                                    } : {type: "row", data: row}))}
                                />
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

const CalendarTableRow = ({
                              rowData,
                              months,
                              viewMode,
                              allWeeks,
                              dates,
                              subRows,
                              rowIndex,
                              openSubRows,
                              contextMenuOptions,
                              onClick,
                              onSelect,
                          }) => {

    const [callOnSelect, setCallOnSelect] = useState()
    useEffect(() => {
        if (callOnSelect) {
            onSelect(
                {
                    selectedOption: callOnSelect.selectedOption,
                    clickedMouseButton: callOnSelect.clickedMouseButton,
                    cellData: callOnSelect.cellData,
                    rowData: callOnSelect.rowData
                }
            )
            setCallOnSelect()
        }
    }, [callOnSelect])

    const handleOnSelect = (data, rowData) => setCallOnSelect({...data, rowData: rowData})

    return <>
        <tr>
            {Object.entries(months)?.map(([month, weeks], monthIndex) => {
                const [, prevMonthWeeks] = Object.entries(months)[monthIndex - 1] ?? [undefined, undefined]
                const [, nextMonthWeeks] = Object.entries(months)[monthIndex + 1] ?? [undefined, undefined]

                if (viewMode === "MONTHS") {
                    const filled = Boolean(dates.filter(({start, end}) => {
                        return isDateBetween(monthIndex, start.getMonth(), end.getMonth())
                    }).length)
                    return <CalendarTableCell
                        className={"month"}
                        dayIndex={monthIndex}
                        filled={filled}
                        contextMenuOptions={contextMenuOptions}
                        onClick={onClick}
                        onSelect={handleOnSelect}
                        cellData={{
                            type: "month",
                            data: {
                                month: month,
                                weeks: weeks
                            }
                        }}
                    />
                }

                if (viewMode === "WEEKS") {
                    return Object.entries(weeks).map(([weekNumber, days], weekIndex) => {
                        const prevWeek = allWeeks[Number(weekNumber) - 1]
                        const nextWeek = allWeeks[Number(weekNumber) + 1]

                        const numberOfFirstWeekInNextMonth = Object.entries(nextMonthWeeks ?? {}).at(0)?.at(0)
                        const [numberOfLastWeekInPrevMonth, daysOfLastWeekInPrevMonth] = Object.entries(prevMonthWeeks ?? {}).at(-1) ?? [undefined, undefined]
                        const filled = Boolean(dates.filter(({start, end}) => {
                            return Boolean(allWeeks[Number(weekNumber)].filter(({date}) => isDateBetween(date, start, end)).length)
                        }).length)

                        return Boolean(weekNumber !== numberOfLastWeekInPrevMonth) && <CalendarTableCell
                            dayIndex={weekIndex}
                            colSpan={weekNumber === numberOfFirstWeekInNextMonth ? 2 : 1}
                            filled={filled}
                            contextMenuOptions={contextMenuOptions}
                            onClick={onClick}
                            onSelect={handleOnSelect}
                            cellData={
                                {
                                    type: "week",
                                    data: {
                                        weekNumber: weekNumber,
                                        days: days
                                    }
                                }
                            }
                        />
                    })
                }

                return Object.entries(weeks).reduce((prevDays, [weekNumber, days]) => {
                    const [numberOfLastWeekInPrevMonth, _] = Object.entries(prevMonthWeeks ?? {}).at(-1) ?? [undefined, undefined]

                    return [...prevDays, ...(weekNumber !== numberOfLastWeekInPrevMonth ? allWeeks[Number(weekNumber)] : [])]
                }, []).map(({date}, dayIndex) => {
                    const filled = Boolean(dates.filter(({start, end}) => isDateBetween(date, start, end)).length)
                    return <CalendarTableCell
                        dayIndex={dayIndex}
                        filled={filled}
                        contextMenuOptions={contextMenuOptions}
                        onClick={onClick}
                        onSelect={handleOnSelect}
                        cellData={{
                            type: "day",
                            data: date
                        }}
                    />
                })
            })}
        </tr>

        {Boolean(subRows && subRows.length && openSubRows.includes(rowIndex)) && subRows.map((subRowData) => {
            const {dates} = subRowData
            return <CalendarTableRow
                months={months}
                viewMode={viewMode}
                allWeeks={allWeeks}
                dates={dates.map(({start, end}) => {
                    const startDate = start.split("-").map(Number)
                    const endDate = end.split("-").map(Number)

                    const rowStartDate = new Date(startDate[2], startDate[1] - 1, startDate[0], 0, 0, 0)
                    const rowEndDate = new Date(endDate[2], endDate[1] - 1, endDate[0], 0, 0, 0)

                    return {start: rowStartDate, end: rowEndDate}
                })}
                contextMenuOptions={contextMenuOptions}
                onClick={(data) => {
                    if (typeof onClick === "function")
                        onClick({...data, rowData: {type: "subRow", data: subRowData}})
                }}
                onSelect={(d) => handleOnSelect(d, {type: "subRow", data: subRowData})}
            />
        })}
    </>
}

const CalendarTableCell = ({
                               className,
                               dayIndex,
                               filled,
                               onSelect,
                               onClick,
                               cellData,
                               colSpan = 1,
                               contextMenuOptions = []
                           }) => {
    const [renderSelect, setRenderSelect] = useState(false)
    const [selectOpen, setSelectOpen] = useState(false)

    const handleMouseClick = (e) => {
        // prevent context menu from opening on right-click
        e.preventDefault();

        if (e.nativeEvent.button === 0) {
            if (typeof onClick === "function")
                onClick({
                    clickedMouseButton: "left",
                    cellData: cellData
                })
        } else if (e.nativeEvent.button === 2) {
            if (contextMenuOptions && contextMenuOptions.length) {
                setRenderSelect({clickedMouseButton: "right", options: contextMenuOptions})
                setTimeout(() => {
                    setSelectOpen(Date.now())
                }, 250)
            }
        }
    }

    // this ref is used to get the last selectOptions open state
    const openTimeoutRef = useRef()
    useEffect(() => {
        if (!selectOpen) setRenderSelect()
    }, [selectOpen])

    return <td
        className={`${className} calendar-table-cell ${filled ? "filled" : ""}`}
        key={dayIndex}
        colSpan={colSpan}
        onContextMenu={(e) => {
            handleMouseClick(e)
        }}
        onClick={(e) => {
            handleMouseClick(e)
        }}
    >
        {renderSelect ?
            <Select
                updatePosition={selectOpen}
                headerText={renderSelect.clickedMouseButton}
                options={renderSelect?.options ?? []}
                open={selectOpen}
                onActive={(open) => {
                    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
                    openTimeoutRef.current = setTimeout(() => {
                        if (!open)
                            setSelectOpen(false)
                    }, 350)
                }}
                onSelect={(selectedOption) => {
                    if (onSelect && renderSelect && selectOpen) {
                        onSelect(
                            {
                                selectedOption: selectedOption,
                                clickedMouseButton: renderSelect.clickedMouseButton,
                                cellData: cellData
                            }
                        )
                    }
                }}
            >
                <div>
                    {filled ? <span
                        className="material-symbols-outlined">close_small</span> : <span
                        className=""> </span>}
                </div>
            </Select> : <div>
                {filled && <span
                    className="material-symbols-outlined">close_small</span>}
            </div>}
    </td>
}


const isDateBetween = (dateToCheck, startDate, endDate) => {
    return startDate <= dateToCheck && dateToCheck <= endDate;
}

export default CalendarTable