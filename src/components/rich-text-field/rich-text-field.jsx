import { useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./styles.sass";

const RichTextfield = ({
  className,
  value,
  onChange,
  readOnly,
  disableControlButtons
}) => {
  const ref = useRef();
  const [_value, _setValue] = useState(() =>
    value
      ? readOnly
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
        : value
      : EditorState.createEmpty()
  );

  const toggleBlockType = (blockType) => {
    const editedValue = RichUtils.toggleBlockType(_value, blockType);
    _setValue(editedValue);
    if (onChange) onChange(editedValue);
  };

  const toggleInlineStyle = (inlineStyle) => {
    const editedValue = RichUtils.toggleInlineStyle(_value, inlineStyle);
    _setValue(editedValue);
    if (onChange) onChange(editedValue);
  };

  return (
    <div
      className={`rich-text-field ${className} ${readOnly ? "read-only" : ""} ${
        disableControlButtons ? "without-control-buttons" : ""
      }`}
      onClick={() => {
        if (ref) {
          ref.current.focus();
        }
      }}
    >
      {!readOnly && !disableControlButtons ? (
        <div className="rich-text-field-control-buttons">
          <BlockStyleControls editorState={_value} onToggle={toggleBlockType} />
          <InlineStyleControls
            editorState={_value}
            onToggle={toggleInlineStyle}
          />
        </div>
      ) : null}

      <Editor
        editorState={_value}
        onChange={(v) => {
          _setValue(v);
          if (onChange)
            onChange(JSON.stringify(convertToRaw(v.getCurrentContent())));
        }}
        readOnly={readOnly}
        ref={ref}
      />
    </div>
  );
};

const StyleButton = ({ label, active, onToggle, style }) => {
  const _onToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      onMouseDown={_onToggle}
    >
      {label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "title", style: "header-one" },
  //{ label: "H2", style: "header-two" },
  //{ label: "H3", style: "header-three" },
  //{ label: "H4", style: "header-four" },
  //{ label: "H5", style: "header-five" },
  //{ label: "H6", style: "header-six" },
  //{ label: "Blockquote", style: "blockquote" },
  { label: "format_list_bulleted", style: "unordered-list-item" },
  { label: "format_list_numbered", style: "ordered-list-item" }
  //{ label: "Code Block", style: "code-block" }
];

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "format_bold", style: "BOLD" },
  { label: "format_italic", style: "ITALIC" },
  { label: "format_underlined", style: "UNDERLINE" }
  //{ label: "Monospace", style: "CODE" }
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichTextfield;
