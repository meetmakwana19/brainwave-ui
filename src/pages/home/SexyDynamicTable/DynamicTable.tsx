import React, { useEffect, useState } from "react";
import "./DynamicTable.css";
import { Icon, Notification, Truncate } from "@contentstack/venus-components";
import { TableItem } from "../../../common/types";
import { isEmpty } from "../../../common/utils/utils";
import { parseISO, formatDistanceToNow } from "date-fns";
import { deleteDocument, getAllDocuments } from "../../../api/document";

interface DynamicTableProps {
  data?: TableItem[];
  viewMode?: boolean;
  onRowClick: (item: TableItem) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  viewMode,
  onRowClick,
}) => {
  const [tableData, setTableData] = useState(data);
  const [deleting, setDeleting] = useState(false);

  // Function to handle row click

  // Function to handle delete
  const handleDelete = (uid: string) => {
    // setTableData(tableData?.filter((item) => item.uid !== uid));

    setDeleting(true);
    deleteDocument(uid)
      .then(async () => {
        console.log("Document deleted successfully");
        Notification({
          type: "success",
          notificationContent: {
            text: "Document deleted successfully",
          },
          notificationProps: { hideProgressBar: true, autoClose: true },
        });

        await getAllDocuments()
          .then((data) => {
            setTableData(data);
          })
          .catch((error) => {
            throw error;
          });

        setDeleting(false);
      })
      .catch((error) => {
        setDeleting(false);
        Notification({
          type: "error",
          notificationContent: {
            text: "Error deleting the document",
          },
          notificationProps: { hideProgressBar: true, autoClose: true },
        });
        console.error("Error deleting document:", error);
      });
  };

  useEffect(() => {
    // fetchDocuments();
    setTableData(data);
  }, [data]);

  // const fetchDocuments = async () => {
  //   const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`);

  //   const data = await response.json();

  //   console.log("data is ", data);
  //   setTableData(data);
  // };

  // Helper function to convert `last_updated` to relative time
  const getRelativeTime = (dateString: string) => {
    if (!dateString) return "Unknown"; // Handle empty or invalid dates
    const parsedDate = parseISO(dateString); // Convert string to Date object
    return formatDistanceToNow(parsedDate, { addSuffix: true }); // Get relative time
  };

  return (
    <div className="table-container">
      <table className="dynamic-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Modified At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item) => (
            <tr
              key={item.uid}
              className="table-row"
              onClick={() => onRowClick(item)} // Trigger the onRowClick function
            >
              <td>
                {isEmpty(item.title) ? (
                  "Untitled Document"
                ) : (
                  <Truncate maxChar={80}>{item.title}</Truncate>
                )}
              </td>
              <td>{item.author}</td>
              <td>{getRelativeTime(item.last_updated)}</td>
              {viewMode ? null : (
                <td className="actions">
                  <button
                    className="action-button delete-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click when delete is clicked
                      handleDelete(item.uid);
                    }}
                    disabled={deleting}
                  >
                    <Icon
                      className="delete-brain-wave-button-icon"
                      icon="Delete"
                      size="small"
                      version="v2"
                    />
                  </button>
                  <button
                    className="action-button share-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click when delete is clicked
                      // handleDelete(item.uid);
                    }}
                  >
                    <Icon
                      className="share-brain-wave-button-icon"
                      icon="UsersLHS"
                      size="small"
                      version="v2"
                    />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
