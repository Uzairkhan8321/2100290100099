// src/components/AverageCalculator.jsx

import React, { useState } from 'react';
import axios from 'axios';

const numberIds = ['pi', 'f', 'e', 'r', 'prime'];

const AverageCalculator = () => {
  const [selectedId, setSelectedId] = useState('pi');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace 'your_bearer_token' with your actual bearer token
  const bearerToken = 'your_bearer_token';

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  return (
    <div className="average-calculator p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Average Calculator</h1>
      <select
        className="border p-2 mb-4 w-full"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {numberIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchData}
      >
        Fetch Average
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {data && (
        <div className="result mt-4">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <p>Window Previous State: {JSON.stringify(data.windowPrevState)}</p>
          <p>Window Current State: {JSON.stringify(data.windowCurrState)}</p>
          <p>Numbers: {JSON.stringify(data.numbers)}</p>
          <p>Average: {data.avg}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
