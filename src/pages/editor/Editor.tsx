import { Icon, JsonRTE } from "@contentstack/venus-components";
import React, { useEffect, useState } from "react";
import "./Editor.css";
import { useLocation } from "react-router-dom";
// import { sample } from "../../sample";

const Editor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author] = useState("Meet Makwana");
  const [lastUpdated] = useState("12:59 11/27/2024");
  const [dontShowToolBar, setDontShowToolBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split("/");

    const canRemove = pathArray.includes("stack-create-new-wave");

    console.log("meet canRemove : ", canRemove);
    setDontShowToolBar(canRemove);

  }, [location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (content: any) => {
    console.log("Editor content updated:", content);

    // setEditorContent(content);
  };

  const handleSlashCommand = (command: string) => {
    alert(`Selected command: ${command}`);
  };

  return (
    <div className={`editor-section ${dontShowToolBar ? "dont-show-rte-toolbar" : null}`}>
      <div className="sub-heading">
        <div className="title-input">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="editable-title"
            disabled={dontShowToolBar}
          />
        </div>
        <div className="author-details">
          <Icon icon="User" version="v2" size="small" />
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
        disabled={dontShowToolBar}
        // value={sample}
      />
    </div>
  );
};

export default Editor;
