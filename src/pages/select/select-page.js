import React, { useState } from 'react'
import './styles.sass'
import Select from '../../components/select/select'

const shuffledArray = array => array.sort(() => 0.5 - Math.random())

const myLoremText =
    "While there aresome promotions that offer free MasterCard general getting MasterCard forfree isnot possible asitisa financial product that requires certain fees and charges Ifyou arelooking foraway obtain a MasterCard without paying an annual feeor other charges youcan consider applying foracredit card with  waived annual fee Somecredit cards mayoffer introductory periods with noannual feeormay waive the feeifyou meet certain spending requirements However it's important to carefully read the terms and conditions ofany credit card before applying to understand potential charges Additionally besuretouse credit responsibly andpayoff your balance infull each month to avoid interest charges and damage toyour credit score"

const SelectPage = () => {
    const [_fakeList, _] = useState(
        new Array(500).fill().map(() => {
            return shuffledArray(myLoremText.split(' ')).slice(8, 15).join(' ')
        })
    )

    return (
        <div className="page">
            <Select
                headerText={'Multiselector'}
                enableSearch
                multiSelect
                enableSelectAllButton
                options={_fakeList}
                onSelect={selectedOption => {
                    console.log(selectedOption)
                }}
            >
                click me to open select options
            </Select>
            <Select
                headerText={'Multiselector Parallelview'}
                enableSearch
                multiSelect
                showSelectedParallel
                enableSelectAllButton
                options={_fakeList}
                onSelect={selectedOption => {
                    console.log(selectedOption)
                }}
            >
                click me to open select options
            </Select>
            <Select
                enableSearch
                headerText={'Array'}
                options={['asdf1', 'asdf2', ['asdf3', [0, [1, _fakeList]]]]}
                onSelect={selectedOption => {
                    console.log('[onSelect]: ', selectedOption)
                }}
            >
                click me to open select options
            </Select>
            <Select
                enableSearch
                headerText={'Object'}
                options={{ 1: 'asdf1', 2: 'asdf2', 3: ['asdf3', [0, [1, _fakeList]]] }}
                onSelect={selectedOption => {
                    console.log('[onSelect]: ', selectedOption)
                }}
            >
                click me to open select options
            </Select>
            <Select
                options={{ 1: 'asdf1', 2: 'asdf2', 3: ['asdf3', [0, [1, _fakeList]]] }}
                onSelect={selectedOption => {
                    console.log('[onSelect]: ', selectedOption)
                }}
            >
                click me to open select options
            </Select>
        </div>
    )
}

export default SelectPage