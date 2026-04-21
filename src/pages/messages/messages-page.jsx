import React from 'react'
import Button from '../../components/button/button'
import { useStore } from '../../hooks-store/store'

const pageStyle = {
    padding: '32px',
    display: 'grid',
    gap: '24px',
    overflow: 'auto',
    alignContent: 'start'
}

const groupStyle = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
}

const MessagesPage = () => {
    const [, dispatch] = useStore()

    const pushMessage = type => {
        dispatch('ADD_NEW_MESSAGE', {
            message: `${type} message from the demo page`,
            type,
            dismissible: true,
            timeoutInMilliseconds: 4000
        })
    }

    return (
        <div className="page" style={pageStyle}>
            <div>
                <h1>Messages</h1>
                <p>Use the buttons below to trigger the global toast stack.</p>
            </div>

            <div style={groupStyle}>
                <Button green primary onClick={() => pushMessage('SUCCESS')}>
                    Success message
                </Button>
                <Button yellow primary onClick={() => pushMessage('WARNING')}>
                    Warning message
                </Button>
                <Button red primary onClick={() => pushMessage('DANGER')}>
                    Danger message
                </Button>
            </div>
        </div>
    )
}

export default MessagesPage
