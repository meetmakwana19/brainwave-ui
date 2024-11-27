import { Icon, JsonRTE } from "@contentstack/venus-components";
import React, { useState } from "react";
import "./Editor.css";

const Editor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState("Meet Makwana");
  const [lastUpdated, setLastUpdated] = useState("12:59 11/27/2024");

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
      <div className="sub-heading">
        <div className="title-input">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="editable-title"
          />
        </div>
        <div className="author-details">
          <Icon icon="User" version="v2" size="small"/>
          <p>{author}</p>
        </div>
        <div className="last-updated-details">
          {" "}
          <p>Last updated at {lastUpdated}</p>
        </div>
      </div>

      <JsonRTE
        onChange={handleContentChange}
        onSlashCommand={handleSlashCommand}
        toolbarMode="advance"
      />
    </div>
  );
};

export default Editor;
