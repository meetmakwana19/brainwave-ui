import React from "react";
import DynamicTable from "../home/SexyDynamicTable/DynamicTable";

interface TableItem {
  id: number;
  name: string;
  creator: string;
  lastViewed: string;
}

interface IStackApp {
  data: TableItem[];
  onRowClick: (item: TableItem) => void;
  viewMode?: boolean;
}

const StackApp: React.FC<IStackApp> = (props: IStackApp) => {
  return (
    <div>
      <DynamicTable data={props.data} onRowClick={props.onRowClick} viewMode={props.viewMode} />
    </div>
  );
};

export default StackApp;
