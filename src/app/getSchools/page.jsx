// src/app/getSchools/page.jsx
"use client";

import { useEffect, useState } from 'react';

export default function GetSchools() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await fetch('/api/schools');
                const data = await response.json();
                setSchools(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Schools List</h1>
            <ul className="space-y-4">
                {schools.map((school) => (
                    <li key={school.id} className="border p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">{school.name}</h2>
                        <p className="text-gray-600">{school.address}</p>
                        <p className="text-gray-600">{school.city}, {school.state}</p>
                        <p className="text-gray-600">Contact: {school.contact}</p>
                        <p className="text-gray-600">Email: {school.email_id}</p>
                        {school.image && (
                            <img
                                src={`/path/to/images/${school.image}`}
                                alt={school.name}
                                className="mt-2 w-full h-auto object-cover rounded-md"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
