import { Button, Icon, JsonRTE } from "@contentstack/venus-components";
import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import { useLocation, useParams } from "react-router-dom";
// import { sample } from "../../sample";
import debounce from "lodash.debounce";
import { putDocument } from "../../api/document";
import { TableItem } from "../../common/types";

interface IEditor { 
  isContentEmpty: boolean;
  setIsContentEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  docTitle: string;
  setDocTitle: React.Dispatch<React.SetStateAction<string>>;
  isStackEditor?: boolean;
  docData: TableItem;
}

const Editor: React.FC<IEditor> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState("Meet Makwana");
  const [lastUpdated, setLastUpdated] = useState("12:59 11/27/2024");
  const [dontShowToolBar, setDontShowToolBar] = useState(false);
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorContentRef = useRef<any>(null);
  const { documentUid } = useParams<{ documentUid: string }>();

  console.log("isContentEmpty", props.isContentEmpty);

  useEffect(() => {
    setTitle(props.docTitle);
  }, [props.docTitle]);

  useEffect(() => {
    editorContentRef.current = props.docData?.document;
    setAuthor(props.docData?.author);
    setLastUpdated(props.docData?.last_updated);
  }, [props.docData]);

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
        props.setDocTitle(response.title);
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
    props.setIsContentEmpty(isEmpty);
    editorContentRef.current = content;
    handleDebouncedChange(content);
  };

  const handleButtonClick = () => { 
    console.log(`Button clicked: Add to Entry`);
    alert(`Button clicked: here`);
  }

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
          <Button onClick={handleButtonClick()}>Add to Entry</Button>
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

      {editorContentRef.current ? (
        <JsonRTE
          onChange={handleContentChange}
          toolbarMode="advance"
          disabled={dontShowToolBar}
          value={editorContentRef.current}
        />
      ) : (
        <JsonRTE
          onChange={handleContentChange}
          toolbarMode="advance"
          disabled={dontShowToolBar}
        />
      )}
    </div>
  );
};

export default Editor;
