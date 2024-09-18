import {useEffect, useRef, useState} from 'react'
import _ from 'underscore'

export const useSettings = (name, initSettings = {}, onUpdate = null, deps = null) => {
    const settingsName = `SETTINGS(${name})`

    const settingsExist = () => localStorage.getItem(settingsName)

    const savedSettings = () => {
        const settingsFromLocalStorage = localStorage.getItem(settingsName)
        return settingsFromLocalStorage ? JSON.parse(settingsFromLocalStorage) : initSettings
    }

    const saveSettings = _settings => {
        localStorage.setItem(settingsName, JSON.stringify(_settings))
    }

    // add settings if was not exist
    const addSettingsTimeout = useRef()
    const addSettings = () => {
        if (addSettingsTimeout.current) clearTimeout(addSettingsTimeout.current)
        addSettingsTimeout.current = setTimeout(() => {
            const _savedSettings = savedSettings()
            const _settingsWasNotSaved = {}
            Object.keys(initSettings).forEach(key => {
                if (!Object.keys(_savedSettings).includes(key)) _settingsWasNotSaved[key] = initSettings[key]
            })
            if (Object.keys(_settingsWasNotSaved).length || !settingsExist())
                saveSettings({..._savedSettings, ..._settingsWasNotSaved})
        }, 50)
    }

    useEffect(() => {
        addSettings()
        return () => clearTimeout(addSettingsTimeout.current)
    }, [])

    const [settings, _setSettings] = useState(savedSettings())

    // this setter is used to give the last saved settings as attribute
    const setSettings = callback => {
        if (typeof callback === 'function') {
            const nextSettings = callback(savedSettings())
            if (nextSettings) {
                _setSettings(nextSettings)
                saveSettings(nextSettings)
            }
        }
    }

    const prevDeps = useRef()
    const depsTimeout = useRef()
    useEffect(() => {
        if (depsTimeout.current) clearTimeout(depsTimeout.current)
        depsTimeout.current = setTimeout(() => {
            addSettings()
            if (!_.isEqual(deps, prevDeps.current)) {
                const _savedSettings = savedSettings()
                _setSettings(_savedSettings)
                prevDeps.current = deps
            }
        }, 100)
        return () => clearTimeout(depsTimeout.current)
    }, [...deps, name])


    useEffect(() => {
        if (onUpdate) {
            onUpdate(settings)
        }
    }, [settings])

    return [settings, setSettings]
}
