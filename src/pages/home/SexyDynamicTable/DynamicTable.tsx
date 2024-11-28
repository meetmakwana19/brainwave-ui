import React, { useState } from 'react';
import './DynamicTable.css';
import { Icon } from '@contentstack/venus-components';

interface TableItem {
    id: number;
    name: string;
    creator: string;
    lastViewed: string;
}

interface DynamicTableProps {
    data: TableItem[];
    onRowClick: (item: TableItem) => void;
    viewMode?: boolean;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data, onRowClick, viewMode }) => {
    const [tableData, setTableData] = useState(data);

    // Function to handle delete
    const handleDelete = (id: number) => {
        setTableData(tableData.filter(item => item.id !== id));
    };
    console.log(tableData);

    return (
        <div className="table-container">
            <table className="dynamic-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Viewed</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item) => (
                        <tr
                            key={item.id}
                            className="table-row"
                            onClick={() => onRowClick(item)} // Trigger the onRowClick function
                        >
                            <td>{item.name}</td>
                            <td>{item.creator}</td>
                            <td>{item.lastViewed}</td>
                            {viewMode ? null : <td className="actions">
                                <button
                                    className="action-button delete-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click when delete is clicked
                                        handleDelete(item.id);
                                    }}
                                >
                                    <Icon className='delete-brain-wave-button-icon' icon='Delete' size='small' version='v2' />
                                </button>
                                <button
                                    className="action-button share-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click when delete is clicked
                                        handleDelete(item.id);
                                    }}
                                >
                                    <Icon className='share-brain-wave-button-icon' icon='UsersLHS' size='small' version='v2' />
                                </button>
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;
