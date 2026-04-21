# Khalil Design — Component Library

> A React UI component library built with React 17, SASS, and GSAP.

## Installation / Getting Started

```bash
npm install
npm start
```

To run the interactive component demo:

```bash
npm start
# opens http://localhost:3000
```

---

## Components

- [Button](#button)
- [Checkbox](#checkbox)
- [Select](#select)
- [TextField](#textfield)
- [Modal](#modal)
- [Switcher](#switcher)
- [Headline](#headline)
- [PaginationBar](#paginationbar)
- [Messages](#messages)
- [Nav](#nav)
- [FloatingActionButtons](#floatingactionbuttons)
- [InfosCard](#infoscard)
- [RichTextField](#richtextfield)
- [CalendarTable](#calendartable)
- [TreeTable](#treetable)

---

## Button

A flexible button component supporting multiple variants, colours, icons, and a loading state.

### Import

```js
import Button from './src/components/button/button'
```

### Basic usage

```jsx
<Button primary green leftIcon="add" onClick={() => console.log('clicked')}>
  Save
</Button>

<Button outlined red loading>
  Deleting…
</Button>

<Button text leftIcon="edit" />
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `primary` | `bool` | `false` | Filled / primary style |
| `outlined` | `bool` | `false` | Outlined style |
| `text` | `bool` | `false` | Text-only (no background) style |
| `disabled` | `bool` | `false` | Disables click events and applies disabled style |
| `withShadow` | `bool` | `false` | Adds a drop shadow |
| `loading` | `bool` | `false` | Shows a loading spinner and disables clicks |
| `green` | `bool` | `false` | Green colour variant |
| `grey` | `bool` | `false` | Grey colour variant |
| `red` | `bool` | `false` | Red colour variant |
| `blue` | `bool` | `false` | Blue colour variant |
| `yellow` | `bool` | `false` | Yellow colour variant |
| `className` | `string` | `''` | Extra CSS class names |
| `leftIcon` | `string` | — | Material symbol name rendered on the left |
| `rightIcon` | `string` | — | Material symbol name rendered on the right |
| `onClick` | `func` | — | Click handler (ignored when `disabled` or `loading`) |
| `children` | `node` | — | Button label / content |

---

## Checkbox

A controlled or semi-controlled checkbox that supports indeterminate state and label positioning.

### Import

```js
import Checkbox from './src/components/checkbox/checkbox'
```

### Basic usage

```jsx
<Checkbox
  primary
  checked={isChecked}
  onCheck={(val) => setIsChecked(val)}
>
  Accept terms
</Checkbox>

<Checkbox indeterminate>Partial selection</Checkbox>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `bool` | `false` | Controlled checked state |
| `indeterminate` | `bool` | `false` | Shows a dash instead of a tick |
| `className` | `string` | `''` | Extra CSS class names |
| `primary` | `bool` | `false` | Primary colour style |
| `disabled` | `bool` | `false` | Disables interaction |
| `children` | `node` | — | Label content |
| `onCheck` | `func` | — | Called with the new boolean value on toggle |
| `left` | `bool` | `false` | Places label to the left of the box |
| `right` | `bool` | `false` | Places label to the right of the box |

---

## Select

A highly configurable dropdown / combobox with multi-select, search, and sort support.

### Import

```js
import Select from './src/components/select/select'
```

### Basic usage

```jsx
<Select
  options={['Apple', 'Banana', 'Cherry']}
  onSelect={(option) => console.log(option)}
>
  <button>Choose fruit</button>
</Select>

{/* Multi-select with search */}
<Select
  options={{ a: 'Alpha', b: 'Beta', c: 'Gamma' }}
  multiSelect
  enableSearch
  searchPlaceHolder="Search…"
  onSelect={(options) => console.log(options)}
>
  <button>Pick letters</button>
</Select>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `array or object` | `[]` | Options as an array of values or `{ key: label }` map |
| `selected` | `array` | `[]` | Controlled selected value `[id, value]` or array of those |
| `onSelect` | `func` | — | Called with selected value(s) after each change |
| `onActive` | `func` | — | Called with `boolean` when the dropdown opens / closes |
| `top` | `bool` | `true` | Allow dropdown to open upward |
| `bottom` | `bool` | `true` | Allow dropdown to open downward |
| `left` | `bool` | `true` | Allow dropdown to align left |
| `right` | `bool` | `true` | Allow dropdown to align right |
| `multiSelect` | `bool` | `false` | Enables selecting multiple options |
| `defaultAllSelected` | `bool` | `false` | Pre-selects all options |
| `defaultOption` | `bool` | `false` | Activates a "default" no-selection option |
| `defaultOptionText` | `string` | — | Text for the default option |
| `enableSearch` | `bool` | `false` | Shows a search input inside the dropdown |
| `searchPlaceHolder` | `string` | `''` | Placeholder for the search input |
| `enableSelectAllButton` | `bool` | `false` | Shows "Select all" button (requires `multiSelect`) |
| `enableCloseButton` | `bool` | `false` | Shows a close button inside the dropdown |
| `closeButtonText` | `string` | `'close'` | Label for the close button |
| `toggleAllOptions` | `func` | — | External handler to toggle all options |
| `selectAllOptions` | `func` | — | External handler to select all options |
| `clearAllOptions` | `func` | — | External handler to clear all options |
| `headerText` | `string` | — | Header label displayed inside the dropdown |
| `selectOptionsClassName` | `string` | `''` | Extra class applied to the options container |
| `enableSelectedStatusDot` | `bool` | `false` | Shows a colour dot for selected state |
| `sort` | `'ASC' or 'DESC'` | — | Sort direction for options |
| `showSelectedParallel` | `bool` | `false` | Renders selected options in a parallel list view |
| `children` | `node` | — | The trigger element (button, text, etc.) |

---

## TextField

A text / number / textarea input with optional icon buttons, validation, and a percent mode.

### Import

```js
import TextField from './src/components/textfield/textfield'
```

### Basic usage

```jsx
<TextField
  value={name}
  onChange={(val) => setName(val)}
/>

<TextField
  type="number"
  isPercent
  value={rate}
  onChange={(val) => setRate(val)}
/>

<TextField
  type="textarea"
  isInvalid={hasError}
  invalidText="This field is required"
  value={description}
  onChange={(val) => setDescription(val)}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string or number` | `''` | Controlled input value |
| `type` | `'text' or 'number' or 'textarea'` | `'text'` | Input type |
| `onChange` | `func` | — | Called with the new value on every keystroke |
| `className` | `string` | `''` | Extra CSS class names |
| `isInvalid` | `bool` | `false` | Marks the field as invalid |
| `invalidText` | `string` | — | Validation message shown below the field |
| `isPercent` | `bool` | `false` | Appends a `%` suffix |
| `leftIconButton` | `node` | — | Element rendered as a left icon button |
| `rightIconButton` | `node` | — | Element rendered as a right icon button |
| `beforeComponent` | `node` | — | Content prepended before the input |
| `afterComponent` | `node` | — | Content appended after the input |
| `inputRef` | `ref` | — | Ref forwarded to the underlying `<input>` / `<textarea>` |

---

## Modal

An animated overlay dialog with headline, body slot, cancel, and submit actions.

### Import

```js
import Modal from './src/components/modal/modal'
```

### Basic usage

```jsx
<Modal
  show={isOpen}
  headline="Confirm deletion"
  cancelText="Cancel"
  submitText="Delete"
  onCancel={() => setIsOpen(false)}
  onSubmit={handleDelete}
  submitLoading={isDeleting}
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `show` | `bool` | `false` | Controls visibility (animates in/out) |
| `headline` | `string` | `'Copy Past Forecast Columns'` | Dialog title |
| `children` | `node` | — | Dialog body content |
| `cancelIcon` | `string` | `'clear'` | Material symbol for the cancel button |
| `onCancel` | `func` | — | Called when the cancel button is clicked |
| `cancelText` | `string` | `'Cancel'` | Cancel button label |
| `submitLoading` | `bool` | `false` | Shows a spinner on the submit button |
| `submitIcon` | `string` | `'check'` | Material symbol for the submit button |
| `onSubmit` | `func` | — | Called when the submit button is clicked |
| `submitText` | `string` | `'Submit'` | Submit button label |
| `className` | `string` | `''` | Extra CSS class names on the root element |
| `style` | `object` | — | Inline styles on the root element |

---

## Switcher

A toggle switch with left / right icon slots and optional vertical orientation.

### Import

```js
import Switcher from './src/components/switcher/switcher'
```

### Basic usage

```jsx
<Switcher
  value={isDark}
  leftIcon="light_mode"
  rightIcon="dark_mode"
  onSwitch={(val) => setIsDark(val)}
/>

{/* Vertical orientation */}
<Switcher vertical value={isOn} onSwitch={setIsOn} />
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `bool` | `false` | Controlled toggle state |
| `onSwitch` | `func` | — | Called with the new boolean after toggle |
| `leftIcon` | `string` | `'light_mode'` | Material symbol for the left / off side |
| `rightIcon` | `string` | `'dark_mode'` | Material symbol for the right / on side |
| `leftColor` | `string` | — | CSS colour for the left icon when active |
| `rightColor` | `string` | — | CSS colour for the right icon when active |
| `vertical` | `bool` | `false` | Stacks the toggle vertically |

---

## Headline

An editable heading that switches between display and input mode, with undo / save controls.

### Import

```js
import Headline from './src/components/headline/headline'
```

### Basic usage

```jsx
<Headline
  text="My Document"
  editable
  focusOnDoubleClick
  onSubmit={(val) => saveName(val)}
  enableCheckButton
  h2
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `''` | Current heading text |
| `oldText` | `string` | — | Previous text (used when resetting) |
| `editable` | `bool` | `false` | Allows the user to edit the heading |
| `focusOnDoubleClick` | `bool` | `false` | Enters edit mode on double-click |
| `onChange` | `func` | — | Called on every keystroke with the current value |
| `onSubmit` | `func` | — | Called when the user confirms the edit |
| `error` | `bool` | `false` | Marks the heading as invalid |
| `hintText` | `string` | `'Enter name'` | Hint shown when `error` is `true` |
| `headerIcon` | `string` | — | Material symbol displayed before the text |
| `h1`–`h6` | `bool` | `false` | Sets the heading size (only one should be `true`) |
| `maxLength` | `number` | — | Maximum allowed character count |
| `enableCheckButton` | `bool` | `false` | Shows a confirm (✓) icon button |
| `reset` | `any` | — | Changing this value resets text to `oldText` |
| `save` | `any` | — | Changing this value triggers `onSubmit` |
| `className` | `string` | `''` | Extra CSS class names |

---

## PaginationBar

A pagination control with page navigation buttons and a rows-per-page selector.

### Import

```js
import PaginationBar from './src/components/pagination-bar/paginationBar'
```

### Basic usage

```jsx
<PaginationBar
  currentPage={page}
  pagesLength={totalPages}
  setCurrentPage={setPage}
  onSetRowsLength={(rows) => setRowsPerPage(rows)}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `currentPage` | `number` | — | The currently active page (1-based) |
| `pagesLength` | `number` | — | Total number of pages |
| `setCurrentPage` | `func` | — | Called with the new page number |
| `onSetRowsLength` | `func` | — | Called with the selected rows-per-page value |

---

## Messages

A global toast / alert system powered by the internal hooks-store. Call `dispatch('ADD_NEW_MESSAGE', payload)` from anywhere in the application to show a notification.

### Import

```js
import Messages from './src/components/messages/messages'
// and the store hook
import useStore from './src/hooks-store/store'
```

### Basic usage

Mount `<Messages />` once near the root of your app:

```jsx
// App.jsx
import Messages from './src/components/messages/messages'

const App = () => (
  <>
    <Messages />
    {/* rest of your app */}
  </>
)
```

Dispatch a message from any component:

```jsx
import useStore from './src/hooks-store/store'

const MyComponent = () => {
  const [, dispatch] = useStore()

  return (
    <button
      onClick={() =>
        dispatch('ADD_NEW_MESSAGE', {
          type: 'success',        // 'success' | 'error' | 'warning' | 'info'
          title: 'Saved!',
          message: 'Your changes have been saved.',
        })
      }
    >
      Save
    </button>
  )
}
```

---

## Nav

A navigation sidebar component that renders the primary app navigation.

### Import

```js
import Nav from './src/components/nav/nav'
```

### Basic usage

```jsx
<Nav />
```

The Nav component reads route configuration and renders navigation links automatically. Place it alongside your main content area.

---

## FloatingActionButtons

A Floating Action Button (FAB) component that provides quick-access actions.

### Import

```js
import FloatingActionButtons from './src/components/floating-action-buttons/floatingActionButtons'
```

### Basic usage

```jsx
<FloatingActionButtons />
```

---

## InfosCard

An information card component for displaying summary metrics or status information.

### Import

```js
import InfosCard from './src/components/infos-card/infosCard'
```

### Basic usage

```jsx
<InfosCard />
```

---

## RichTextField

A rich text editor built on Draft.js with formatting toolbar support.

### Import

```js
import RichTextField from './src/components/rich-text-field/richTextField'
```

### Basic usage

```jsx
import { EditorState } from 'draft-js'

const [editorState, setEditorState] = useState(EditorState.createEmpty())

<RichTextField
  editorState={editorState}
  onChange={setEditorState}
/>
```

---

## CalendarTable

A calendar / schedule table that renders time-based data with optional context menus.

### Import

```js
import CalendarTable from './src/components/calendartable/calendartable'
```

### Basic usage

```jsx
import CalendarTable, { dummy_calendar_table_data } from './src/components/calendartable/calendartable'

<CalendarTable
  data={dummy_calendar_table_data}
  onClick={(entry) => console.log(entry)}
  contextMenuOptions={['Edit', 'Delete', 'Duplicate']}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `array` | `[]` | Calendar entries to render |
| `onClick` | `func` | — | Called with the clicked entry object |
| `contextMenuOptions` | `array` | `[]` | List of context-menu item labels |

---

## TreeTable

A hierarchical data table that supports expand / collapse of nested rows.

### Import

```js
import TreeTable from './src/components/tree-table/treeTable'
```

### Basic usage

```jsx
<TreeTable data={hierarchicalData} />
```
