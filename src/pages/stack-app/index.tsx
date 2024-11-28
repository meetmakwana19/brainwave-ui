import React, { useEffect, useState } from "react";
import DynamicTable from "../home/SexyDynamicTable/DynamicTable";
import { TableItem } from "../../common/types";

interface IStackApp {
  onRowClick: (item: TableItem) => void;
  viewMode?: boolean;
}

const StackApp: React.FC<IStackApp> = (props: IStackApp) => {
  const [documentData, setDocumentData] = useState<TableItem[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`);

    const data = await response.json();

    setDocumentData(data);
  };

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
