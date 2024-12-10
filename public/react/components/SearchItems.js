import React, { useState } from "react";
import apiURL from "../api";

export const SearchItems = () => {
  const [searchQuery, setSearchQuery] = useState(""); // The search query
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle search input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch items based on the search query
  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    // Only make the API request if there is a search query
    if (searchQuery.trim()) {
      try {
        // Construct the query string with the search query
        const queryString = new URLSearchParams({
          name: searchQuery,
        }).toString();
        const response = await fetch(`${apiURL}/items/search?${queryString}`);

        const data = await response.json();

        if (data.error) {
          setError(data.error); // Handle error response from API
          setItems([]); // Reset items on error
        } else if (Array.isArray(data)) {
          setItems(data); // Update items if the response is an array
        } else {
          setItems([]); // Unexpected response format
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setError(error.message || "Failed to fetch items");
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setItems([]); // Clear items if the search query is empty
      setLoading(false); // Stop loading if no query
    }
  };

  return (
    <div>
      <h3>Search Items</h3>

      <div>
        <label>
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search by name"
          />
        </label>
      </div>

      {/* Search Button */}
      <div>
        <button onClick={fetchItems} disabled={loading || !searchQuery.trim()}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h4>Search Results</h4>
        {/* Show a message if no items found */}
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <h5>{item.name}</h5>
                <p>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
