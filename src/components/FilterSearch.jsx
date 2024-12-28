// src/components/FilterSearch.jsx
"use client";

import { useState } from "react";

export default function FilterSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by Name, Title, or Question..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-500"
      />
    </div>
  );
}
