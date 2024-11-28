import React from "react";
import Editor from "../editor/Editor";
import './index.css'

const StackEditor: React.FC= () => {
  return (
    <div className='stack-editor-view'>
      <Editor/>
    </div>
  );
};

export default StackEditor;
