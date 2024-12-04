import React, { useState } from 'react';
import { FORM_TYPES } from '../utils/formConfig';
import FormField from './FormField';
import SubmittedDataTable from './SubmittedDataTable';

const DynamicForm = () => {
    const [formType, setFormType] = useState('');
    const [formData, setFormData] = useState({});
    const [submittedData, setSubmittedData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');

    // Handle form type change
    const handleFormTypeChange = (e) => {
        const value = e.target.value;
        setFormType(value);
        setFormData({});
        setEditingId(null);
        setErrors({});
    };

    // Handle input changes
    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear specific field error
        if (errors[name]) {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formType) {
            return false;
        }

        FORM_TYPES[formType].fields.forEach(field => {
            if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (editingId) {
                // Update existing entry
                setSubmittedData(prev =>
                    prev.map(item =>
                        item.id === editingId ? { ...formData, id: editingId } : item
                    )
                );
                setSubmissionStatus('Changes saved successfully!');
                setEditingId(null);
            } else {
                // Add new entry
                const newEntry = { ...formData, id: Date.now() };
                setSubmittedData(prev => [...prev, newEntry]);
                setSubmissionStatus('Sign-up Successful!');
            }

            // Reset form
            setFormType('');
            setFormData({});
            setTimeout(() => setSubmissionStatus(''), 3000);
        }
    };

    // Handle edit
    const handleEdit = (item) => {
        setFormType(Object.keys(FORM_TYPES).find(type =>
            FORM_TYPES[type].fields.some(field => field.name in item)
        ));
        setFormData(item);
        setEditingId(item.id);
    };

    // Handle delete
    const handleDelete = (id) => {
        setSubmittedData(prev => prev.filter(item => item.id !== id));
        setSubmissionStatus('Entry deleted successfully!');
        setTimeout(() => setSubmissionStatus(''), 3000);
    };

    // Calculate progress
    const calculateProgress = () => {
        if (!formType) return 0;
        const totalFields = FORM_TYPES[formType].fields.length;
        const filledFields = FORM_TYPES[formType].fields.filter(field => formData[field.name]).length;
        return (filledFields / totalFields) * 100;
    };

    return (
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6">Dynamic Form</h1>
            {submissionStatus && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {submissionStatus}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Select Form Type</label>
                    <select
                        value={formType}
                        onChange={handleFormTypeChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select a Form</option>
                        <option value="user-info">User Information</option>
                        <option value="address">Address</option>
                        <option value="payment">Payment</option>
                    </select>
                </div>
                {formType && FORM_TYPES[formType].fields.map(field => (
                    <FormField
                        key={field.name}
                        field={field}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        error={errors[field.name]}
                    />
                ))}
                {formType && (
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        {editingId ? 'Update' : 'Submit'}
                    </button>
                )}
            </form>
            <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded">
                    <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${calculateProgress()}%` }}
                    ></div>
                </div>
            </div>
            <SubmittedDataTable
                data={submittedData}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default DynamicForm;