import React from 'react'
import { Link } from 'react-router-dom'
import './styles.sass'

const components = [
    {
        name: 'Button',
        description: 'Flexible button with variants, colors, icons, and loading state.',
        path: '/button',
        snippet: '<Button primary green>\n  Save\n</Button>'
    },
    {
        name: 'Checkbox',
        description: 'Checkbox control with indeterminate and label-position variants.',
        path: '/controls',
        snippet: '<Checkbox checked={checked} onCheck={setChecked}>\n  Accept terms\n</Checkbox>'
    },
    {
        name: 'Select',
        description: 'Configurable dropdown with multi-select, search, and sorting.',
        path: '/select',
        snippet: '<Select options={[\'A\', \'B\']} onSelect={fn}>\n  <Button outlined>Choose</Button>\n</Select>'
    },
    {
        name: 'TextField',
        description: 'Text, number, and textarea inputs with validation support.',
        path: '/textfield',
        snippet: '<TextField value={value} onChange={setValue} />'
    },
    {
        name: 'Modal',
        description: 'Animated modal dialog with cancel and submit actions.',
        path: '/modal',
        snippet: '<Modal show={open} onCancel={close} onSubmit={save} />'
    },
    {
        name: 'Switcher',
        description: 'Binary switcher with left and right icon states.',
        path: '/controls',
        snippet: '<Switcher value={enabled} onSwitch={setEnabled} />'
    },
    {
        name: 'Headline',
        description: 'Inline-editable heading with reset, save, and validation states.',
        path: '/controls',
        snippet: '<Headline text=\"Campaign\" editable h2 onSubmit={save} />'
    },
    {
        name: 'PaginationBar',
        description: 'Paging control for tables with rows-per-page selection.',
        path: '/controls',
        snippet: '<PaginationBar currentPage={1} pagesLength={10} setCurrentPage={setPage} />'
    },
    {
        name: 'Messages',
        description: 'Global hooks-store driven toast and alert stack.',
        path: '/messages',
        snippet: 'dispatch(\'ADD_NEW_MESSAGE\', { message: \'Saved\', type: \'SUCCESS\' })'
    },
    {
        name: 'Nav',
        description: 'Collapsible application sidebar with pin and theme controls.',
        path: '/nav',
        snippet: '<Nav user=\"Khalil\" onStatusChange={console.log} />'
    },
    {
        name: 'Tabs',
        description: 'Tabbed navigation for switching between content panels.',
        path: '/tabs',
        snippet: '<Tabs />'
    },
    {
        name: 'FloatingActionButtons',
        description: 'Floating stack of quick action buttons.',
        path: '/floating-action-buttons',
        snippet: '<FloatingActionButtons actionButtons={actions} />'
    },
    {
        name: 'InfosCard',
        description: 'Information card for showing mapped label and value details.',
        path: '/infos-card',
        snippet: '<InfosCard infosObject={info} translationObject={labels} />'
    },
    {
        name: 'RichTextField',
        description: 'Draft.js based rich text editor with optional controls.',
        path: '/rich-textfield',
        snippet: '<RichTextField value={value} onChange={setValue} />'
    },
    {
        name: 'TreeTable',
        description: 'Hierarchical data table with expandable nested rows.',
        path: '/tree-table',
        snippet: '<TreeTable data={rows} setExpandAllRows={setExpandAllRows} />'
    },
    {
        name: 'CalendarTable',
        description: 'Calendar-style table with month, week, and day views.',
        path: '/calendartable',
        snippet: '<CalendarTable data={entries} onClick={fn} contextMenuOptions={[\'Edit\']} />'
    }
]

const ComponentCard = ({ name, description, path, snippet }) => (
    <div className="component-card">
        <h2 className="component-card__name">{name}</h2>
        <p className="component-card__description">{description}</p>
        <pre className="component-card__snippet"><code>{snippet}</code></pre>
        <Link className="component-card__link" to={path}>
            Open demo →
        </Link>
    </div>
)

const GroovSvg = () => (
    <svg className={'paper-effect'} xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="goovey">
                <feTurbulence type="fractalNoise" baseFrequency=".005" seed="10" result="warpper"></feTurbulence>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="70" in="SourceGraphic"></feDisplacementMap>
            </filter>
        </defs>
        <defs>
            <filter id="gooveyCooling">
                <feTurbulence type="fractalNoise" baseFrequency="0" seed="1" result="warpper"></feTurbulence>
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="70" in="SourceGraphic"></feDisplacementMap>
            </filter>
        </defs>
        <defs>
            <filter width="2560" height="1440" x="0" y="0" id="blur1" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="0 0"></feGaussianBlur>
            </filter>
        </defs>
    </svg>
)

const Start = () => {
    return (
        <div className={'start-page'}>
            <GroovSvg />
            <header className={'start-page__header'}>
                <h1 className={'start-page__title'}>Khalil Design</h1>
                <p className={'start-page__subtitle'}>A React UI component library built with React 17, SASS, and GSAP</p>
                <p className={'start-page__intro'}>
                    Browse the component library below. Shared demo pages are used only where multiple related components belong together.
                </p>
            </header>
            <div className={'start-page__grid'}>
                {components.map(c => (
                    <ComponentCard key={c.name} {...c} />
                ))}
            </div>
        </div>
    )
}

export default Start

