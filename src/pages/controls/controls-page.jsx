import React, { useState } from 'react'
import Checkbox from '../../components/checkbox/checkbox'
import Headline from '../../components/headline/headline'
import PaginationBar from '../../components/pagination-bar/paginationBar'
import Switcher from '../../components/switcher/switcher'

const sectionStyle = {
    padding: '24px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.9)',
    display: 'grid',
    gap: '16px'
}

const pageStyle = {
    padding: '32px',
    display: 'grid',
    gap: '24px',
    overflow: 'auto',
    alignContent: 'start'
}

const ControlsPage = () => {
    const [checked, setChecked] = useState(true)
    const [switchValue, setSwitchValue] = useState(false)
    const [headlineText, setHeadlineText] = useState('Editable headline')
    const [currentPage, setCurrentPage] = useState(2)
    const [rowsLength, setRowsLength] = useState(5)

    return (
        <div className="page" style={pageStyle}>
            <div style={sectionStyle}>
                <h2>Checkbox</h2>
                <Checkbox checked={checked} onCheck={setChecked}>
                    Accept terms and conditions
                </Checkbox>
                <Checkbox indeterminate>Partially selected</Checkbox>
                <p>Current value: {String(checked)}</p>
            </div>

            <div style={sectionStyle}>
                <h2>Switcher</h2>
                <Switcher value={switchValue} onSwitch={setSwitchValue} />
                <p>Current value: {String(switchValue)}</p>
            </div>

            <div style={sectionStyle}>
                <h2>Headline</h2>
                <Headline
                    text={headlineText}
                    editable
                    focusOnDoubleClick
                    enableCheckButton
                    h2
                    onChange={setHeadlineText}
                    onSubmit={() => {}}
                />
                <p>Double click the heading to edit it.</p>
            </div>

            <div style={sectionStyle}>
                <h2>PaginationBar</h2>
                <PaginationBar
                    currentPage={currentPage}
                    pagesLength={12}
                    setCurrentPage={setCurrentPage}
                    onSetRowsLength={setRowsLength}
                />
                <p>
                    Current page: {currentPage} — Rows per page: {rowsLength}
                </p>
            </div>
        </div>
    )
}

export default ControlsPage
