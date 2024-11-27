import { JsonRTE } from "@contentstack/venus-components";
import React from "react";

const Editor: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (content: any) => {
    console.log("Editor content updated:", content);

    // setEditorContent(content);
  };

  const handleSlashCommand = (command: string) => {
    alert(`Selected command: ${command}`);
  };

  return (
    <div>
      <JsonRTE
        onChange={handleContentChange}
        onSlashCommand={handleSlashCommand}
        toolbarMode="advance"
      />
    </div>
  );
};

export default Editor;
