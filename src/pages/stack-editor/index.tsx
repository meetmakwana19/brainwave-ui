import React from "react";
import Editor from "../editor/Editor";
import './index.css'

const StackEditor: React.FC= (props) => {
  return (
    <div className='stack-editor-view'>
      <Editor isStackEditor={props.isStackEditor} />
    </div>
  );
};

export default StackEditor;
