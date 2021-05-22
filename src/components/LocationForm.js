// LocationForm.js
import { FaArrowCircleRight } from 'react-icons/fa';
import { useState } from 'react';

const LocationForm = () => {

  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const routeFetch = () => {
    const mapQuestURL = new URL(`http://www.mapquestapi.com/directions/v2/route`)
    const mapQuestKey = 'yhn7INwuFvAefsr6GSedhz0ry1k94m6b';
  
    // parameters
  mapQuestURL.search = new URLSearchParams({
    key: mapQuestKey,
    from: location,
    to: destination
  })

  // fetch
  fetch(mapQuestURL)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      console.log('route:', jsonResponse.route);
    })
  };

  const handleLocationInput = (event) => {
    let location = event.target.value;
    setLocation(location);
  }

  const handleDestinationInput = (event) => {
    let destination = event.target.value;
    setDestination(destination);
  }

  const handleLocationSubmit = (event) => {

    event.preventDefault();
    console.log(location);
    console.log(destination);
    routeFetch();
  }

  return (
    <form action="submit" className="wrapper locationForm" onSubmit={handleLocationSubmit}>
      <div>
        <label htmlFor="currentLocation">Current Location:</label>
        <input type="text" id="currentLocation" onChange={handleLocationInput}></input>

        <label htmlFor="destination">Your Destination:</label>
        <input type="text" id="destination" onChange={handleDestinationInput}></input>
      </div>

      <div>
        <button type="submit" className="locationButton"><FaArrowCircleRight /></button>
      </div>
    </form>
  )
}

export default LocationForm;