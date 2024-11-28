import { Icon, JsonRTE } from "@contentstack/venus-components";
import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import { useLocation, useParams } from "react-router-dom";
// import { sample } from "../../sample";
import debounce from "lodash.debounce";
import { putDocument } from "../../api/document";

interface IEditor {
  docTitle: string;
  setDocTitle: React.Dispatch<React.SetStateAction<string>>;
}
const Editor: React.FC<IEditor> = ({ docTitle, setDocTitle }) => {
  const [title, setTitle] = useState<string>("");
  const [author] = useState("Meet Makwana");
  const [lastUpdated] = useState("12:59 11/27/2024");
  const [dontShowToolBar, setDontShowToolBar] = useState(false);
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorContentRef = useRef<any>(null);
  const [isContentEmpty, setIsContentEmpty] = useState(true);
  const { documentUid } = useParams<{ documentUid: string }>();

  console.log("isContentEmpty", isContentEmpty);

  useEffect(() => {
    setTitle(docTitle);
  }, [docTitle]);

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const canRemove = pathArray.includes("stack-create-new-wave");
    setDontShowToolBar(canRemove);
  }, [location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkIsContentEmpty = (content: any[]): boolean => {
    // If content is not an array or is empty, it's considered empty
    if (!Array.isArray(content) || content.length === 0) {
      return true;
    }

    // Recursively check all children for non-empty text
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkNode = (node: any): boolean => {
      if (node?.children?.length > 0) {
        return node.children.every(checkNode);
      }
      return !node.text?.trim(); // Text is empty or only whitespace
    };

    // Check all top-level nodes
    return content.every(checkNode);
  };

  // Debounced content handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDebouncedChange = debounce((content: any) => {
    const docContent = {
      title: typeof content === "string" ? content : title,
      document: Array.isArray(content) ? content : editorContentRef.current,
      author: "Meet Makwana",
    };
    const putPayload = {
      content: JSON.stringify(docContent),
    };
    // alert("Debounced content change detected");
    // makePutRequest(content);

    putDocument(documentUid, putPayload)
      .then((response) => {
        console.log("Document updated successfully", response);
        setDocTitle(response.title);
      })
      .catch((error) => {
        console.error("Error in updating document", error);
      });
  }, 2000); // Adjust debounce delay as neededx

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (content: any) => {
    console.log("Editor content updated:", content);

    // setEditorContent(content);
    const isEmpty = checkIsContentEmpty(content);
    setIsContentEmpty(isEmpty);

    editorContentRef.current = content;
    handleDebouncedChange(content);
  };

  return (
    <div
      className={`editor-section ${
        dontShowToolBar ? "dont-show-rte-toolbar" : null
      }`}
    >
      <div className="sub-heading">
        <div className="title-input">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleDebouncedChange(e.target.value);
            }}
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
        toolbarMode="advance"
        disabled={dontShowToolBar}
        // value={sample}
      />
    </div>
  );
};

export default Editor;
