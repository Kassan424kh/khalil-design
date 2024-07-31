// This function is used to update old local storage settings
// to make life easier for users without telling them to clear local storage
// and start everything over
export const updateOldLocalSettings = () => {
    // get all localstorage data converted to objects
    // don't delete in Future
    const localStorageData = {
        ...(() => {
            const convertedSettingsFromTextToJson = {}
            Object.entries(localStorage).forEach(([k, v]) => {
                try {
                    convertedSettingsFromTextToJson[k] = JSON.parse(v)
                } catch (e) {
                    convertedSettingsFromTextToJson[k] = v
                }
            })
            return convertedSettingsFromTextToJson
        })()
    }

    // Update old Dashboards settings
    const updateOldDashboardSettings = (k, v) => {
        // change businessType to include multiOptions values
        if (k.includes('fc-customer-sender') || k.includes('fc-absolute_')) {
            if (v?.businessType?.length) {
                if (!Array.isArray(v.businessType.at(0))) {
                    v['businessType'] = v.businessType.map(String).includes('0') ? [] : [v.businessType]
                } else if (v.businessType.filter(businessType => String(businessType[0]) === '0').length) {
                    v['businessType'] = v.businessType.filter(businessType => String(businessType[0]) !== '0')
                }
                localStorage.setItem(k, JSON.stringify(v))
            }
        }
        // change agencyAA to include multiOptions values
        if (k.includes('fc-absolute_')) {
            if (
                v?.agencyAA?.length &&
                (!Array.isArray(v.agencyAA.at(0)) || v.agencyAA.filter(agencyAA => agencyAA[0] === '0'))
            ) {
                if (!Array.isArray(v.agencyAA.at(0))) {
                    v['agencyAA'] = v.agencyAA.map(String).includes('0') ? [] : [v.agencyAA]
                } else if (v.agencyAA.filter(agencyAA => String(agencyAA[0]) === '0').length) {
                    v['agencyAA'] = v.agencyAA.filter(agencyAA => String(agencyAA[0]) !== '0')
                }
                localStorage.setItem(k, JSON.stringify(v))
            }
        }
        // update Discount6 set 0 to String if it was a number
        if (k.includes('trade-detail_')) {
            if (v?.Discount6?.length) {
                v['Discount6'] = v.Discount6?.map(String)
                localStorage.setItem(k, JSON.stringify(v))
            }
        }
    }

    // update and save data to localstorage again with the new values
    // don't delete in Future
    Object.entries(localStorageData).forEach(([k, v]) => {
        updateOldDashboardSettings(k, v)
    })
}
