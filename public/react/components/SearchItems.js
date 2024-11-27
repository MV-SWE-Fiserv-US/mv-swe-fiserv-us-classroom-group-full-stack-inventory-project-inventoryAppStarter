import React, { useState, useEffect } from 'react';
import apiURL from '../api';

export const SearchItems = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    price: '',
    category: '',
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);  // State to track loading status
  const [error, setError] = useState(null);  // State to handle error messages

  // Handle input changes in search fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch filtered items based on search criteria
  const fetchItems = async () => {
    setLoading(true);  // Start loading
    setError(null);  // Reset error state on new search
    try {
      // Construct the query string and ensure it doesn't include any newline characters
      const queryString = new URLSearchParams(searchCriteria).toString();
      console.log(queryString);
      
      // Only make the API request if there are valid search criteria
      if (queryString) {
        const response = await fetch(`${apiURL}/items/search?${queryString}`);
  
        const data = await response.json();
        console.log("API Response Data:", data); // Log the full response to check its contents
    
        if (data.error) {
          setError(data.error);  // Handle error response from the API
          setItems([]);  // Reset items on error
        } else if (Array.isArray(data)) {
          setItems(data);  // Update items if the response is an array
        } else {
          setItems([]);  // In case the response is unexpected
          setError('Unexpected response format');  // Set a generic error
        }
      } else {
        setItems([]);  // No search criteria, clear the items
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  // Trigger fetch when search criteria change, but only if there is a valid change
  useEffect(() => {
    // Only trigger the fetch when any search criteria are filled
    if (searchCriteria.name || searchCriteria.price || searchCriteria.category) {
      fetchItems();  // Trigger fetch if there are any search criteria
    } else {
      setItems([]);  // Reset items when search criteria is empty
    }
  }, [searchCriteria]);  // Trigger fetch only when search criteria change

  return (
    <div>
      <h3>Search Items</h3>
      
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={searchCriteria.name}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={searchCriteria.price}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={searchCriteria.category}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Remove the button, because fetching happens automatically */}
      {/* <div>
        <button onClick={fetchItems}>Search</button>
      </div> */}

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
