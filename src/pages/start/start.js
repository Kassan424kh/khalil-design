import React from 'react'
import { Link } from 'react-router-dom'
import './styles.sass'

const components = [
    {
        name: 'Button',
        description: 'Flexible button with variants, colours, icons, and loading state.',
        path: '/button',
        snippet: '<Button primary green onClick={fn}>\n  Save\n</Button>'
    },
    {
        name: 'Select',
        description: 'Configurable dropdown with multi-select, search, and sort support.',
        path: '/select',
        snippet: '<Select options={[\'A\', \'B\']} onSelect={fn}>\n  <button>Pick</button>\n</Select>'
    },
    {
        name: 'TextField',
        description: 'Text / number / textarea input with validation and icon buttons.',
        path: '/textfield',
        snippet: '<TextField\n  value={val}\n  onChange={setVal}\n/>'
    },
    {
        name: 'Modal',
        description: 'Animated overlay dialog with headline, body, cancel and submit actions.',
        path: '/modal',
        snippet: '<Modal\n  show={open}\n  headline="Confirm"\n  onCancel={close}\n  onSubmit={save}\n/>'
    },
    {
        name: 'Tabs',
        description: 'Tabbed navigation component for switching between views.',
        path: '/tabs',
        snippet: '<Tabs />'
    },
    {
        name: 'FloatingActionButtons',
        description: 'FAB component providing quick-access floating actions.',
        path: '/floating-action-buttons',
        snippet: '<FloatingActionButtons />'
    },
    {
        name: 'InfosCard',
        description: 'Information card for displaying summary metrics or status.',
        path: '/infos-card',
        snippet: '<InfosCard />'
    },
    {
        name: 'RichTextField',
        description: 'Draft.js based rich text editor with formatting toolbar.',
        path: '/rich-textfield',
        snippet: '<RichTextField\n  editorState={state}\n  onChange={setState}\n/>'
    },
    {
        name: 'TreeTable',
        description: 'Hierarchical data table with expand / collapse of nested rows.',
        path: '/tree-table',
        snippet: '<TreeTable data={rows} />'
    },
    {
        name: 'CalendarTable',
        description: 'Calendar / schedule table with context menu support.',
        path: '/calendartable',
        snippet: '<CalendarTable\n  data={entries}\n  onClick={fn}\n  contextMenuOptions={[\'Edit\']}\n/>'
    }
]

const ComponentCard = ({ name, description, path, snippet }) => (
    <div className="component-card">
        <h2 className="component-card__name">{name}</h2>
        <p className="component-card__description">{description}</p>
        <pre className="component-card__snippet"><code>{snippet}</code></pre>
        <Link className="component-card__link" to={path}>
            View demo →
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
            </header>
            <div className={'start-page__grid'}>
                {components.map(c => (
                    <ComponentCard key={c.path} {...c} />
                ))}
            </div>
        </div>
    )
}

export default Start

