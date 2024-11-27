import React from "react";
import EditorPage from "../editor/Editor";
import './index.css'

const StackEditor: React.FC<IStackApp> = () => {
  return (
    <div className='stack-editor-view'>
      <EditorPage />
    </div>
  );
};

export default StackEditor;
