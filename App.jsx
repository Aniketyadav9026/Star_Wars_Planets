import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets/')
      .then(response => response.json())
      .then(data => setPlanets(data.results))
      .catch(error => console.error('Error fetching planets:', error));
  }, []);

  const fetchResidents = async (residents) => {
    const residentDetails = await Promise.all(
      residents.map(async residentUrl => {
        const response = await fetch(residentUrl);
        const residentData = await response.json();
        return residentData;
      })
    );
    return residentDetails;
  };

  const handlePlanetClick = async (planet) => {
    const residentsData = await fetchResidents(planet.residents);
    planet.residents = residentsData;
    setSelectedPlanet(planet);
  };

  return (
    <div className="App">
      <h1>Star Wars Planets</h1>
      <div className="planets-list">
        <h2>Planets List</h2>
        <ul>
          {planets.map((planet, index) => (
            <li key={index} onClick={() => handlePlanetClick(planet)}>{planet.name}</li>
          ))}
        </ul>
      </div>
      {selectedPlanet && (
        <div className="planet-details">
          <h2>Planet Details</h2>
          <p>Name: {selectedPlanet.name}</p>
          <p>Climate: {selectedPlanet.climate}</p>
          <p>Terrain: {selectedPlanet.terrain}</p>
          <p>Notable Residents:</p>
          <ul>
            {selectedPlanet.residents.map((resident, index) => (
              <li key={index}>
                Name: {resident.name}, Height: {resident.height}, Mass: {resident.mass}, Gender: {resident.gender}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
