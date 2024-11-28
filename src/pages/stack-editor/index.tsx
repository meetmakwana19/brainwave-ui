import React, { useEffect, useState } from "react";
import Editor from "../editor/Editor";
import "./index.css";
import { getSingleDocument } from "../../api/document";
import { useParams } from "react-router-dom";
import { TableItem } from "../../common/types";

interface IStackEditor {
  isStackEditor: boolean;
}
const StackEditor: React.FC<IStackEditor> = (props) => {
  const [docTitle, setDocTitle] = useState("");
  const [docData, setDocData] = useState<TableItem>({} as TableItem);
  const { documentUid } = useParams<{ documentUid: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getSingleDocument(documentUid)
      .then((response) => {
        console.log("Document fetched successfully", response);
        setDocTitle(response.title);
        setDocData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in fetching document", error);
        setLoading(false);
      });
  }, [documentUid]);

  return loading ? (
    <>Loading</>
  ) : (
    <div className="stack-editor-view">
      <Editor
        isStackEditor={props.isStackEditor}
        docTitle={docTitle}
        setDocTitle={setDocTitle}
        docData={docData}
        isContentEmpty={true}

      />
    </div>
  );
};

export default StackEditor;
