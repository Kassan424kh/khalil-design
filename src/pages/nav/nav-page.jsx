import React, { useState } from 'react'
import Nav from '../../components/nav/nav'

const pageStyle = {
    padding: '32px 32px 32px 140px',
    display: 'grid',
    gap: '24px',
    overflow: 'auto',
    alignContent: 'start'
}

const panelStyle = {
    padding: '24px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.92)'
}

const NavPage = () => {
    const [status, setStatus] = useState({})

    return (
        <>
            <Nav user="Khalil" forecastIds={[1, 2, 3]} onStatusChange={setStatus} />
            <div className="page" style={pageStyle}>
                <div style={panelStyle}>
                    <h1>Nav</h1>
                    <p>
                        The navigation sidebar is rendered on the left. Hover or click it to inspect the pinned,
                        open, and theme-toggle behavior.
                    </p>
                </div>

                <div style={panelStyle}>
                    <h2>Current nav status</h2>
                    <pre>{JSON.stringify(status, null, 2)}</pre>
                </div>
            </div>
        </>
    )
}

export default NavPage
