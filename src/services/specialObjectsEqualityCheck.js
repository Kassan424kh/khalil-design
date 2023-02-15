import _ from 'underscore'
import { deepCopy } from './deepCopy'

const removeKeysNotAllowed = (o, allowedKeysToCheckEquality) =>
    o.map(row => {
        Object.entries(row).forEach(([k, v]) => {
            // Check if key validation is allowed after editing. If not, remove it from this object
            if (allowedKeysToCheckEquality.includes(k))
                // This variable checks if the value is a number or a string-number
                // and converts it to a number with only 5 decimal places.
                // Otherwise (date_from, ...) does nothing with the value.
                row[k] =
                    !isNaN(parseFloat(v)) && !['date_from', 'date_to'].includes(k) ? `${parseFloat(v).toFixed(5)}` : v
            else delete row[k]
        })
        return row
    })

export const specialObjectsEqualityCheck = (o1, o2, allowedKeysToCheckEquality) => {
    const _deepCopiedO1 = deepCopy(o1)
    const _deepCopiedO2 = deepCopy(o2)

    const _o1 = removeKeysNotAllowed(_deepCopiedO1, allowedKeysToCheckEquality)
    const _o2 = removeKeysNotAllowed(_deepCopiedO2, allowedKeysToCheckEquality)
    // Make sure these two objects do contain the same value
    return _.isEqual(_.sortBy(_o1, 'Id'), _.sortBy(_o2, 'Id'))
}
