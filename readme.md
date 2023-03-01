# Select

## how to use

```JS

<Select
    showSelectedParallel // to show selected options in another listview parallel
    // set options as array e. g. [String, Number, ...] or as a Object e. g. {"key" : "Value", ...}
    options={selectOptions}
    selected={["k", "Name"]} // change select state from outside
    onSelect={(option) => {
        console.log(option); // empty = [], single = [id, value], multi = [[id, value], [id, value], ...]
    }} // recive new selected values after select or unselect option/s
    onActive={(isActive) => {
        console.log(isActive); // Boolean
    }} // recive open and close status
    top={true} // enable position on top, default = true
    bottom={true} // enable position on bottom, default = true
    left={true} // enable position on left, default = true
    right={true} // enable position on right, default = true
    multiSelect // enable multi select
    defaultAllSelected // on default all option selected
    defaultOption // active default option
    defaultOptionText={"asdfasdf"} // default option text
    enableSearch // enable searh option/s
    searchPlaceHolder={"search me"} // search input field placeholder
    enableSelectAllButton // enable select or unselect options, only works when multiSelect is on
    enableCloseButton // enable close button, to close selectOptions window
    closeButtonText={"close"} // change close button text
    toggleAllOptions={toggleSelectOptions} // toggle options select
    selectAllOptions={toggleSelectOptions} // select all options
    clearAllOptions={toggleSelectOptions} // unselect all options
    headerText={"I'm a header"} // set header selectOptions header text
    selectOptionsClassName={"select-options-extra-class-name"} // set selectOptions classNames
    enableSelectedStatusDot // show selected status dot
    sort={"DESC"} // or "ASC"
>
    {/*body*/}
    <p key="adfdasdf">click me</p>
    <p key="adfsasdf">click me</p>
    <p key="adfasdf">click me</p>
</Select>

```
