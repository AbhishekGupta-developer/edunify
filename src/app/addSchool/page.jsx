"use client";

import { useState } from 'react';

export default function AddSchool() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        contact: '',
        email_id: ''
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithFile = new FormData();
        formDataWithFile.append('file', file);
        formDataWithFile.append('name', formData.name);
        formDataWithFile.append('address', formData.address);
        formDataWithFile.append('city', formData.city);
        formDataWithFile.append('state', formData.state);
        formDataWithFile.append('contact', formData.contact);
        formDataWithFile.append('email_id', formData.email_id);

        try {
            const response = await fetch('/api/schools', {
                method: 'POST',
                body: formDataWithFile,
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                setFormData({
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    contact: '',
                    email_id: ''
                });
                setFile(null);
            } else {
                alert(result.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add School</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                    <input
                        id="state"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="contact">Contact</label>
                    <input
                        id="contact"
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email_id">Email ID</label>
                    <input
                        id="email_id"
                        type="email"
                        name="email_id"
                        value={formData.email_id}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="image">Image</label>
                    <input
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add School
                </button>
            </form>
        </div>
    );
}
