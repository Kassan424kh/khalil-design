import { useRef, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./styles.sass";

const RichTextfield = ({ className, value, onChange }) => {
    const ref = useRef();
    const [_value, _setValue] = useState(
        () => value ?? EditorState.createEmpty()
    );

    const toggleBlockType = (blockType) => {
        const editdValue = RichUtils.toggleBlockType(_value, blockType);
        _setValue(editdValue);
        if (onChange) onChange(editdValue);
    };

    const toggleInlineStyle = (inlineStyle) => {
        const editdValue = RichUtils.toggleInlineStyle(_value, inlineStyle);
        _setValue(editdValue);
        if (onChange) onChange(editdValue);
    };

    return (
        <div
            className={`rich-text-field ${className}`}
            onClick={() => {
                if (ref) {
                    ref.current.focus();
                }
            }}
        >
            <div className="rich-text-field-controll-buttons">
                <BlockStyleControls
                    editorState={_value}
                    onToggle={toggleBlockType}
                />
                <InlineStyleControls
                    editorState={_value}
                    onToggle={toggleInlineStyle}
                />
            </div>

            <Editor
                editorState={_value}
                onChange={(v) => {
                    _setValue(v);
                    if (onChange) onChange(v);
                }}
                ref={ref}
            />
        </div>
    );
};

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote";
        default:
            return null;
    }
}

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
