import React, { useState } from 'react';

// Dummy data corresponding to predefined queries
const dummyData = {
  "SELECT * FROM users": [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ],
  "SELECT * FROM orders": [
    { id: 1, order: 'Order 1', amount: 100 },
    { id: 2, order: 'Order 2', amount: 200 },
  ]
};

function App() {
  // Extract predefined queries from the dummyData keys
  const queries = Object.keys(dummyData);

  // States for selected query, query input text, and result data
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [queryInput, setQueryInput] = useState(queries[0]);
  const [resultData, setResultData] = useState(dummyData[queries[0]]);

  // Update the query input as the user types
  const handleQueryChange = (e) => {
    setQueryInput(e.target.value);
  };

  // "Run" the query by updating the result table with dummy data if it exists.
  // Otherwise, show an error message.
  const handleRunQuery = () => {
    if (dummyData[queryInput]) {
      setResultData(dummyData[queryInput]);
    } else {
      setResultData([{ error: "No data available for this query" }]);
    }
  };

  // Handle changes when a predefined query is selected from the dropdown
  const handleQuerySelect = (e) => {
    const query = e.target.value;
    setSelectedQuery(query);
    setQueryInput(query);
    setResultData(dummyData[query]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dummy SQL Query App</h1>

      {/* Query Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="query-selector" style={{ marginRight: '10px' }}>
          Select a predefined query:
        </label>
        <select
          id="query-selector"
          value={selectedQuery}
          onChange={handleQuerySelect}
        >
          {queries.map((query, index) => (
            <option key={index} value={query}>
              {query}
            </option>
          ))}
        </select>
      </div>

      {/* SQL Input Area */}
      <div style={{ marginBottom: '20px' }}>
        <textarea
          rows="5"
          cols="50"
          value={queryInput}
          onChange={handleQueryChange}
          placeholder="Type your SQL query here..."
          style={{ padding: '10px', fontFamily: 'monospace' }}
        />
      </div>

      {/* Run Query Button */}
      <button onClick={handleRunQuery} style={{ padding: '10px 20px' }}>
        Run Query
      </button>

      {/* Result Table */}
      <div style={{ marginTop: '20px' }}>
        <h2>Results:</h2>
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* Dynamically create table headers if data exists */}
              {resultData.length > 0 &&
                Object.keys(resultData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {resultData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
