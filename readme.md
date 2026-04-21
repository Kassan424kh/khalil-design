# Khalil Design — Component Library

> A React UI component library built with React 17, SASS, and GSAP.

## Installation / Getting Started

```bash
npm install
npm start
```

Other useful scripts:

```bash
npm run build
npm test
```

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

A flexible button component with filled, outlined, text, icon-only, and loading states.

### Import

```jsx
import Button from './src/components/button/button'
```

### Basic usage

```jsx
<Button primary green leftIcon="add" onClick={() => console.log('clicked')}>
  Save
</Button>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `primary` | `bool` | `false` | Applies the primary filled button style. |
| `outlined` | `bool` | `false` | Applies the outlined variant. |
| `text` | `bool` | `false` | Applies the text-button variant. |
| `disabled` | `bool` | `false` | Prevents clicks and applies disabled styling. |
| `withShadow` | `bool` | `false` | Adds the shadow treatment. |
| `loading` | `bool` | `false` | Shows the loading effect and disables clicks. |
| `green` | `bool` | `false` | Applies the green color variant. |
| `grey` | `bool` | `false` | Applies the grey color variant. |
| `red` | `bool` | `false` | Applies the red color variant. |
| `blue` | `bool` | `false` | Applies the blue color variant. |
| `yellow` | `bool` | `false` | Applies the yellow color variant. |
| `className` | `string` | — | Adds custom class names to the root element. |
| `leftIcon` | `string` | — | Material symbol rendered before the content. |
| `rightIcon` | `string` | — | Material symbol rendered after the content. |
| `onClick` | `func` | — | Click handler called when the button is enabled. |
| `children` | `node` | — | Button label or custom content. |

---

## Checkbox

A checkbox with optional indeterminate state and flexible label positioning.

### Import

```jsx
import Checkbox from './src/components/checkbox/checkbox'
```

### Basic usage

```jsx
<Checkbox checked={checked} onCheck={setChecked}>
  Accept terms
</Checkbox>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `bool` | `false` | Controlled checked value. |
| `indeterminate` | `bool` | `false` | Shows the indeterminate icon instead of a check. |
| `className` | `string` | — | Adds custom class names to the root element. |
| `primary` | `bool` | `false` | Applies the primary checkbox styling. |
| `disabled` | `bool` | `false` | Disables interaction. |
| `children` | `node` | — | Label content shown beside the checkbox. |
| `onCheck` | `func` | — | Called with the next checked value when toggled. |
| `left` | `bool` | `false` | Places the label on the left side. |
| `right` | `bool` | `false` | Places the label on the right side. |

---

## Select

A configurable dropdown with support for multi-select, search, sorting, and custom actions.

### Import

```jsx
import Select from './src/components/select/select'
```

### Basic usage

```jsx
<Select
  options={['Apple', 'Banana', 'Cherry']}
  onSelect={option => console.log(option)}
>
  <Button outlined rightIcon="arrow_drop_down">Choose fruit</Button>
</Select>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `array or object` | — | Options list as an array or `{ key: label }` object. |
| `selected` | `array` | — | Controlled selected option or selected options. |
| `onSelect` | `func` | — | Called after an option is selected or cleared. |
| `onActive` | `func` | — | Called with the open / closed state of the menu. |
| `top` | `bool` | — | Allows the dropdown to open above the trigger. |
| `bottom` | `bool` | — | Allows the dropdown to open below the trigger. |
| `left` | `bool` | — | Allows left alignment. |
| `right` | `bool` | — | Allows right alignment. |
| `multiSelect` | `bool` | `false` | Enables selecting multiple options. |
| `defaultAllSelected` | `bool` | `false` | Selects all options on first render. |
| `defaultOption` | `bool` | `false` | Enables a default placeholder option. |
| `defaultOptionText` | `string` | — | Label used for the default option. |
| `enableSearch` | `bool` | `false` | Shows the internal search field. |
| `searchPlaceHolder` | `string` | — | Placeholder for the search input. |
| `enableSelectAllButton` | `bool` | `false` | Shows the select-all control in multi-select mode. |
| `enableCloseButton` | `bool` | `false` | Shows a close button inside the options panel. |
| `closeButtonText` | `string` | — | Custom label for the close button. |
| `toggleAllOptions` | `func` | — | External toggle-all handler. |
| `selectAllOptions` | `func` | — | External select-all handler. |
| `clearAllOptions` | `func` | — | External clear-all handler. |
| `headerText` | `string` | — | Header text displayed above the options list. |
| `selectOptionsClassName` | `string` | — | Extra class names for the options container. |
| `enableSelectedStatusDot` | `bool` | `false` | Shows the selected-status dot. |
| `sort` | `string` | — | Sort order, usually `ASC` or `DESC`. |
| `showSelectedParallel` | `bool` | `false` | Renders the selected items in a parallel list view. |
| `children` | `node` | — | Trigger content used to open the dropdown. |

---

## TextField

A text, number, or textarea input with optional before / after content and icon buttons.

### Import

```jsx
import TextField from './src/components/textfield/textfield'
```

### Basic usage

```jsx
<TextField
  value={value}
  onChange={setValue}
  invalidText="Required"
  isInvalid={!value}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string or number` | internal state | Controlled field value. |
| `type` | `text, number, or textarea` | browser default text input | Selects the rendered input type. |
| `onChange` | `func` | — | Called with the next input value. |
| `className` | `string` | — | Adds custom class names to the wrapper. |
| `isInvalid` | `bool` | `false` | Enables invalid styling and feedback text. |
| `invalidText` | `string` | — | Validation message shown below the field. |
| `isPercent` | `bool` | `false` | Formats numeric values as percentages instead of currency. |
| `leftIconButton` | `object` | — | Button config rendered on the left side. |
| `rightIconButton` | `object` | — | Button config rendered on the right side. |
| `beforeComponent` | `node` | — | Content rendered before the input. |
| `afterComponent` | `node` | — | Content rendered after the input. |
| `inputRef` | `func or ref` | — | Ref forwarded to the underlying input or textarea. |

---

## Modal

An animated modal with header, body content, and cancel / submit actions.

### Import

```jsx
import Modal from './src/components/modal/modal'
```

### Basic usage

```jsx
<Modal
  show={show}
  headline="Confirm delete"
  cancelText="Cancel"
  submitText="Delete"
  onCancel={() => setShow(false)}
  onSubmit={handleDelete}
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `show` | `bool` | — | Controls whether the modal is rendered and opened. |
| `headline` | `string` | `Copy Past Forecast Columns` | Modal headline text. |
| `children` | `node` | — | Modal body content. |
| `cancelIcon` | `string` | `clear` | Material symbol used for the cancel button. |
| `onCancel` | `func` | — | Called when the cancel button is clicked. |
| `cancelText` | `string` | `Cancel` | Label for the cancel button. |
| `submitLoading` | `bool` | `false` | Shows the submit button loading state. |
| `submitIcon` | `string` | `check` | Material symbol used for the submit button. |
| `onSubmit` | `func` | — | Called when the submit button is clicked. |
| `submitText` | `string` | `Submit` | Label for the submit button. |
| `className` | `string` | — | Adds custom class names to the modal root. |
| `style` | `object` | — | Inline styles for the modal root. |

---

## Switcher

A binary switcher with icon slots and optional vertical layout.

### Import

```jsx
import Switcher from './src/components/switcher/switcher'
```

### Basic usage

```jsx
<Switcher
  value={enabled}
  leftIcon="light_mode"
  rightIcon="dark_mode"
  onSwitch={setEnabled}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `bool` | — | Current active side of the switcher. |
| `onSwitch` | `func` | — | Called with the next boolean value after toggle. |
| `leftIcon` | `string` | `light_mode` | Material symbol for the left side. |
| `rightIcon` | `string` | `dark_mode` | Material symbol for the right side. |
| `leftColor` | `string` | — | Optional left-side color prop. |
| `rightColor` | `string` | — | Optional right-side color prop. |
| `vertical` | `bool` | `false` | Stacks the control vertically. |

---

## Headline

An inline-editable headline with optional validation, reset, and save controls.

### Import

```jsx
import Headline from './src/components/headline/headline'
```

### Basic usage

```jsx
<Headline
  text="Campaign name"
  editable
  focusOnDoubleClick
  enableCheckButton
  h2
  onSubmit={nextValue => console.log(nextValue)}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `''` | Current headline text. |
| `oldText` | `string` | — | Previous value used by reset handling. |
| `editable` | `bool` | `false` | Enables edit mode controls. |
| `focusOnDoubleClick` | `bool` | `false` | Enables double-click to focus and edit. |
| `onChange` | `func` | — | Called whenever the text changes. |
| `onSubmit` | `func` | — | Called when the user confirms the new value. |
| `error` | `bool` | `false` | Marks the headline as invalid. |
| `hintText` | `string` | `Enter name` | Hint shown while the component is in an error state. |
| `headerIcon` | `string` | — | Material symbol rendered before the headline. |
| `h1` | `bool` | `false` | Applies the h1 size class. |
| `h2` | `bool` | `false` | Applies the h2 size class. |
| `h3` | `bool` | `false` | Applies the h3 size class. |
| `h4` | `bool` | `false` | Applies the h4 size class. |
| `h5` | `bool` | `false` | Applies the h5 size class. |
| `h6` | `bool` | `false` | Applies the h6 size class. |
| `maxLength` | `number` | — | Maximum allowed input length. |
| `enableCheckButton` | `bool` | `false` | Shows the confirmation check icon. |
| `reset` | `any` | — | Triggers internal reset behavior when changed. |
| `save` | `any` | — | Triggers submit behavior when changed. |
| `className` | `string` | — | Adds custom class names to the root element. |

---

## PaginationBar

A compact pagination control with first / previous / next / last actions and a rows selector.

### Import

```jsx
import PaginationBar from './src/components/pagination-bar/paginationBar'
```

### Basic usage

```jsx
<PaginationBar
  currentPage={currentPage}
  pagesLength={pagesLength}
  setCurrentPage={setCurrentPage}
  onSetRowsLength={setRowsLength}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `currentPage` | `number` | — | Current active page. |
| `pagesLength` | `number` | — | Total page count. |
| `setCurrentPage` | `func` | — | Called when the page changes. |
| `onSetRowsLength` | `func` | — | Called when the rows-per-page selection changes. |

---

## Messages

A global toast / alert stack backed by the hooks-store. Mount it once, then dispatch messages from anywhere in the app.

### Import

```jsx
import Messages from './src/components/messages/messages'
import { useStore } from './src/hooks-store/store'
```

### Basic usage

```jsx
const Demo = () => {
  const [, dispatch] = useStore()

  return (
    <>
      <Messages />
      <Button
        onClick={() =>
          dispatch('ADD_NEW_MESSAGE', {
            message: 'Changes saved successfully.',
            type: 'SUCCESS',
            dismissible: true,
            timeoutInMilliseconds: 4000
          })
        }
      >
        Show message
      </Button>
    </>
  )
}
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| — | — | — | `Messages` does not accept props; it reads all message data from the hooks-store. |

### `dispatch('ADD_NEW_MESSAGE', payload)` payload

| Field | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | — | Visible message text. |
| `type` | `string` | — | Message style key, such as `SUCCESS`, `WARNING`, or `DANGER`. |
| `dismissible` | `bool` | — | Allows the user to close the message manually. |
| `timeoutInMilliseconds` | `number` | — | Auto-close timeout used by the message stack. |
| `id` | `string` | — | Optional id for message grouping or tracking. |
| `uuid` | `string` | autogenerated | Optional stable uuid for updating an existing message. |
| `onClose` | `func` | — | Callback fired when the message closes. |
| `page` | `string` | — | Limits the message to a specific page key. |

---

## Nav

A collapsible application sidebar with theme toggle, pinning, and status callbacks.

### Import

```jsx
import Nav from './src/components/nav/nav'
```

### Basic usage

```jsx
<Nav
  user="Khalil"
  forecastIds={[1, 2, 3]}
  onStatusChange={status => console.log(status)}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `user` | `string` | — | User name displayed in the navigation profile area. |
| `forecastIds` | `array` | — | Changing this value clears the current forecast selection. |
| `onStatusChange` | `func` | — | Called when the nav open / pin / visibility state changes. |

---

## FloatingActionButtons

A floating action button group that expands into a stack of quick actions.

### Import

```jsx
import FloatingActionButtons from './src/components/floating-action-buttons/floating-action-buttons'
```

### Basic usage

```jsx
<FloatingActionButtons
  actionButtons={[
    { icon: 'edit', onClick: () => console.log('edit') },
    { icon: 'delete', onClick: () => console.log('delete') },
    { icon: 'add', onClick: () => console.log('add') }
  ]}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `actionButtons` | `array` | `[]` | Array of button config objects spread onto internal `Button` components. |

---

## InfosCard

A label / value card for showing entity details and an optional edit area.

### Import

```jsx
import InfosCard from './src/components/infos-card/infos-card'
```

### Basic usage

```jsx
<InfosCard
  infosObject={{
    headline: 'Profile',
    subHeadline: 'Admin',
    firstName: 'Khalil',
    email: 'demo@example.com'
  }}
  translationObject={{
    firstName: 'First name',
    email: 'Email'
  }}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `infosObject` | `object` | — | Data object containing `headline`, optional `subHeadline`, and mapped values. |
| `translationObject` | `object` | — | Maps data keys to visible labels. |
| `className` | `string` | — | Adds custom class names to the card. |
| `editComponent` | `node` | — | Optional action or edit component rendered at the bottom. |

---

## RichTextField

A Draft.js-based rich text editor with optional formatting controls and read-only mode.

### Import

```jsx
import RichTextField from './src/components/rich-text-field/rich-text-field'
```

### Basic usage

```jsx
const [value, setValue] = useState('')

<RichTextField value={value} onChange={setValue} />
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Adds custom class names to the editor wrapper. |
| `value` | `string` | empty editor | Serialized Draft.js raw content JSON. |
| `onChange` | `func` | — | Called with the serialized raw content whenever the editor changes. |
| `readOnly` | `bool` | `false` | Disables editing and hides the Draft.js cursor behavior. |
| `disableControlButtons` | `bool` | `false` | Hides the inline and block formatting controls. |

---

## CalendarTable

A timeline-style calendar table with row expansion, multiple view modes, and cell selection callbacks.

### Import

```jsx
import CalendarTable from './src/components/calendartable/calendartable'
```

### Basic usage

```jsx
import CalendarTable, {
  dummy_calendar_table_data
} from './src/components/calendartable/calendartable'

<CalendarTable
  data={dummy_calendar_table_data}
  onClick={payload => console.log(payload)}
  onSelect={payload => console.log(payload)}
  contextMenuOptions={['Edit', 'Delete']}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `array` | — | Calendar rows and nested sub-row data. |
| `onClick` | `func` | — | Called when a row or cell is clicked. |
| `contextMenuOptions` | `array` | — | Context-menu option labels passed down to cells. |
| `onSelect` | `func` | — | Called when a cell selection action is emitted. |

---

## TreeTable

A hierarchical tree table with expand / collapse behavior and table-scroll hooks.

### Import

```jsx
import TreeTable from './src/components/tree-table/tree-table'
```

### Basic usage

```jsx
<TreeTable
  data={treeData}
  setExpandAllRows={setExpandAllRows}
  onScrollTable={event => console.log(event.target.scrollTop)}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `setExpandAllRows` | `func` | — | Setter used by the built-in Expand All / Collapse All buttons. |
| `onScrollTable` | `func` | — | Scroll handler for the table body container. |
| `data` | `array` | — | Hierarchical row data rendered by the table. |
