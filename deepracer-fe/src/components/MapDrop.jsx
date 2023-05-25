import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MapDrop = ({ selectedMap, handleMapChange }) => {
  const [maps, setMaps] = useState([]);
  const url = 'http://localhost:4000';

  useEffect(() => {
    axios.get(`${url}/api/maps`)
      .then(res => {
        setMaps(res.data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  }, []);

  return (
    <div className="score-form-input">
      <label>Select a map</label>
      <select value={selectedMap} onChange={handleMapChange}>
        <option value='default'>Select a map</option>
        {maps.map((map, index) => (
          <option key={index} value={map}>{map}</option>
        ))}
      </select>
    </div>
  );
};

export default MapDrop;
