import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchIt = async () => {
      const apiUrl = `/api/locations`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error fetching locations");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIt();
  }, []);

  return (
    <div>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.latitude}, {location.longitude}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
