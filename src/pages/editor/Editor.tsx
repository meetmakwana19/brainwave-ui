import {
  Button,
  Icon,
  JsonRTE,
  Truncate,
} from "@contentstack/venus-components";
import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import { useLocation, useParams } from "react-router-dom";
// import { sample } from "../../sample";
import debounce from "lodash.debounce";
import { mapDocToEntry, putDocument } from "../../api/document";
import { TableItem } from "../../common/types";
import {
  checkIsContentEmpty,
  formatDate,
  isEmpty,
} from "../../common/utils/utils";
import AIIcon from "../../common/components/AIIcon";

interface IEditor {
  isContentEmpty: boolean;
  setIsContentEmpty?: React.Dispatch<React.SetStateAction<boolean>>;
  docTitle: string;
  setDocTitle: React.Dispatch<React.SetStateAction<string>>;
  isStackEditor?: boolean;
  docData: TableItem;
  setIsSyncing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Editor: React.FC<IEditor> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState("Meet Makwana");
  const [lastUpdated, setLastUpdated] = useState("12:59 11/27/2024");
  const [dontShowToolBar, setDontShowToolBar] = useState(false);
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorContentRef = useRef<any>([]);
  const { documentUid } = useParams<{ documentUid: string }>();
  const [mappingLoader, setMappingLoader] = useState<boolean>(false);
  const isUserTyping = useRef(false); // Track whether the user is typing

  useEffect(() => {
    if (!isUserTyping.current) {
      setTitle(props.docTitle);
    }
  }, [props.docTitle]);

  // Reset isUserTyping after a delay to allow syncing from props
  useEffect(() => {
    const timeout = setTimeout(() => {
      isUserTyping.current = false;
    }, 3000); // Adjust the delay as necessary

    return () => clearTimeout(timeout);
  }, [title]);

  useEffect(() => {
    editorContentRef.current = props.docData?.document;
    setAuthor(props.docData?.author);
    setLastUpdated(props.docData?.last_updated);
  }, [props.docData]);

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const canRemove = pathArray.includes("stack-wave-editor");
    setDontShowToolBar(canRemove);
  }, [location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendDataToParent = (entryData: any) => {
    console.log("entryData", entryData);

    // Send data to the parent via postMessage
    window.parent.postMessage(
      {
        type: "SET_DATA",
        // payload: mappingData.entry,
        payload: entryData,
      },
      "https://localhost:8081" // Parent origin
    );
    console.log("meeti sent");
  };

  useEffect(() => {
    if (props.isStackEditor) {
      // sendDataToParent();
      console.log("saving : ", editorContentRef.current);
    }
  }, [props.isStackEditor]);

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

    if (props.setIsSyncing) {
      props.setIsSyncing(true);
    }
    putDocument(documentUid, putPayload)
      .then((response) => {
        console.log("Document updated successfully", response);
        props.setDocTitle(response.title);
        if (props.setIsSyncing) {
          props.setIsSyncing(false);
        }
      })
      .catch((error) => {
        console.error("Error in updating document", error);
        if (props.setIsSyncing) {
          props.setIsSyncing(false);
        }
      });
  }, 2000); // Adjust debounce delay as neededx

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (content: any) => {
    console.log("Editor content updated:", content);
    // setEditorContent(content);
    const isEmpty = checkIsContentEmpty(content);
    if (props.setIsContentEmpty) {
      props.setIsContentEmpty(isEmpty);
    }
    editorContentRef.current = content;
    handleDebouncedChange(content);
  };

  const handleButtonClick = () => {
    setMappingLoader(true); // Set mappingLoader to true
    mapDocToEntry(editorContentRef.current).then((entryData) => {
      console.log("Data sent to parent");
      sendDataToParent(entryData);
      setMappingLoader(false); // Set it back to false after 5 seconds
    });
  };

  return (
    <div
      className={`editor-section 
        ${dontShowToolBar ? "dont-show-rte-toolbar" : null} 
        ${props.isContentEmpty ? "" : "editor-full"}
        `}
    >
      <div className="sub-heading">
        <div
          className={`title-input ${
            dontShowToolBar ? "title-input-stack-view" : null
          }`}
        >
          {props.isStackEditor ? (
            <div className="editable-title">
              <Truncate maxChar={20}>
                {isEmpty(title) ? "Untitled Document" : title}
              </Truncate>
            </div>
          ) : (
            <input
              type="text"
              value={
                title.length > 15 && props.isStackEditor
                  ? `${title.slice(0, 15)}...`
                  : title
              } // Truncate if more than 35 chars
              onChange={(e) => {
                setTitle(e.target.value);
                isUserTyping.current = true; // Indicate that the user is typing
                handleDebouncedChange(e.target.value);
              }}
              placeholder="Untitled"
              className="editable-title"
              disabled={dontShowToolBar}
            />
          )}
          {props.isStackEditor && (
            <>
              <Button
                className={`custom-gradient-button ${
                  mappingLoader ? "custom-gradient-button-loading" : ""
                }`}
                onClick={() => handleButtonClick()}
              >
                <AIIcon />
                {mappingLoader ? "" : "Add to Entry"}
              </Button>

              <Button
                version="v2"
                icon="v2-CaretCircleLeft"
                buttonType="tertiary"
                onClick={() => {
                  history.back();
                }}
                className="editor-back-button"
              />
            </>
          )}
        </div>
        <div className="author-details">
          <Icon icon="User" version="v2" size="small" />
          <p>{author}</p>
        </div>
        <div className="last-updated-details">
          {" "}
          <p>Last updated at {formatDate(lastUpdated)}</p>
        </div>
      </div>

      {editorContentRef.current && !isEmpty(editorContentRef.current) ? (
        <JsonRTE
          onChange={handleContentChange}
          toolbarMode="advance"
          disabled={dontShowToolBar}
          value={editorContentRef.current || []}
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
