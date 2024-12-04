import React from 'react';

const FormField = ({ field, value, onChange, error }) => {
    if (field.type === 'select') {
        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                </label>
                <select
                    value={value || ''}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    className={`mt-1 block w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
                    required={field.required}
                >
                    <option value="">Select {field.label}</option>
                    {field.options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    }

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
                {field.label}
            </label>
            <input
                type={field.type}
                value={value || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={`mt-1 block w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
                required={field.required}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default FormField;