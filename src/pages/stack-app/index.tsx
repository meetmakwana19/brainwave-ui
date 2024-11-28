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

  useEffect(() => {
    getAllDocuments().then((data) => {
      setDocumentData(data);
    });
  }, []);

  return (
    <div>
      <DynamicTable
        data={documentData}
        onRowClick={props.onRowClick}
        viewMode={props.viewMode}
      />
    </div>
  );
};

export default StackApp;
