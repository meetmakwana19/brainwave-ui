import React from "react";
import Editor from "../editor/Editor";
import "./index.css";

interface IStackEditor {
  isStackEditor: boolean;
}
const StackEditor: React.FC<IStackEditor> = (props) => {
  return (
    <div className="stack-editor-view">
      <Editor isStackEditor={props.isStackEditor} />
    </div>
  );
};

export default StackEditor;
