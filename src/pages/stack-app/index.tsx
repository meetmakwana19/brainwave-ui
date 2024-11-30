import React, { useEffect, useState } from "react";
import DynamicTable from "../home/SexyDynamicTable/DynamicTable";
import { TableItem } from "../../common/types";
import { getAllDocuments } from "../../api/document";

interface IStackApp {
  onRowClick: (item: TableItem) => void;
  viewMode?: boolean;
}

const StackApp: React.FC<IStackApp> = (props: IStackApp) => {
  const [documentData, setDocumentData] = useState<TableItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllDocuments()
      .then((data) => {
        setDocumentData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in fetching documents", error);
        setLoading(false);
      });
  }, []);

  return (
    loading ? (
      <div className="brainwave-spin-loader">
        <div className="loader"></div>
        <h1>Please wait</h1>
      </div>
    ) : (
      <div>
        <DynamicTable
          data={documentData}
          onRowClick={props.onRowClick}
          viewMode={props.viewMode}
        />
      </div>
    )
  );
};

export default StackApp;
