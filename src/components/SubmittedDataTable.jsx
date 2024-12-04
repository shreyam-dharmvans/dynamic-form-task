import React from 'react';

const SubmittedDataTable = ({ data, onEdit, onDelete }) => {
    if (data.length === 0) return null;

    const headers = data.length > 0
        ? Object.keys(data[0]).filter(key => key !== 'id')
        : [];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Submitted Data</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header} className="border p-2 bg-gray-100">
                                {header}
                            </th>
                        ))}
                        <th className="border p-2 bg-gray-100">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            {headers.map(header => (
                                <td key={header} className="border p-2">
                                    {item[header]}
                                </td>
                            ))}
                            <td className="border p-2">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubmittedDataTable;