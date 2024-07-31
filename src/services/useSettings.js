import { useEffect, useState } from 'react'

export const useSettings = (name, initSettings = {}, onUpdate = null, deps = null) => {
    const settingsName = `SETTINGS(${name})`

    const savedSettings = () => {
        const settingsFromLocalStorage = localStorage.getItem(settingsName)
        return settingsFromLocalStorage ? JSON.parse(settingsFromLocalStorage) : initSettings
    }

    // add keys wasn't added to saved settings and save it
    useEffect(() => {
        const _savedSettings = savedSettings()
        const _settingsWasNotSaved = {}
        Object.keys(initSettings).forEach(key => {
            if (!Object.keys(_savedSettings).includes(key)) _settingsWasNotSaved[key] = initSettings[key]
        })
        if (Object.keys(_settingsWasNotSaved).length) savedSettings({ ..._savedSettings, ..._settingsWasNotSaved })
    }, [])

    const [settings, setSettings] = useState(savedSettings())

    const _setSettings = newSettings => {
        let _newSettings = newSettings
        if (typeof newSettings === 'function') {
            const _currentSettings = savedSettings()
            _newSettings = newSettings(_currentSettings)
        }
        setSettings(_newSettings)
        return _newSettings
    }

    const saveSettings = settings => {
        localStorage.setItem(settingsName, JSON.stringify(settings))
        return settings
    }

    useEffect(() => {
        if (settings) saveSettings(settings)
    }, [settings])

    // load settings after deps
    if (deps && Array.isArray(deps)) {
        useEffect(() => {
            if (!deps.includes(undefined)) {
                const t = setTimeout(() => {
                    let _savedSettings = savedSettings()
                    if (!_savedSettings) _savedSettings = saveSettings(initSettings)
                    if (_savedSettings) {
                        setSettings(_savedSettings)
                        if (onUpdate) {
                            onUpdate(_savedSettings)
                        }
                    }
                }, 50)
                return () => clearTimeout(t)
            }
        }, deps)
    }

    return [settings, _setSettings]
}
