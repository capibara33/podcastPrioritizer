// LocationForm.js
import { FaArrowCircleRight } from 'react-icons/fa';
import { useState } from 'react';


const LocationForm = ({setMapData}) => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const mapQuestURL = new URL(`http://www.mapquestapi.com/directions/v2/route`)
  const mapQuestKey = 'yhn7INwuFvAefsr6GSedhz0ry1k94m6b';

  const mapCall = () => {
    fetch(mapQuestURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {

        const routeObject = jsonResponse.route;
        setMapData(routeObject);
      })
  }

  const walkRouteFetch = () => {
    // parameters
    mapQuestURL.search = new URLSearchParams({
      key: mapQuestKey,
      from: location,
      to: destination,
      unit: 'k',
      routeType: 'pedestrian'
    })
    // fetch
    mapCall();
  };
  const bikeRouteFetch = () => {
    // parameters
    mapQuestURL.search = new URLSearchParams({
      key: mapQuestKey,
      from: location,
      to: destination,
      unit: 'k',
      routeType: 'bicycle'
    })
    // fetch
    mapCall();
  };

  const handleLocationInput = (event) => {
    if (event.target.value === '') {
      return
    } else {
      setLocation(event.target.value)
    }
  }

  const handleDestinationInput = (event) => {
    if (event.target.value === '') {
      return
    } else {
      setDestination(event.target.value)
    }
  }

  const handleLocationSubmit = (event) => {
    event.preventDefault();
    // This order determines which the object order within the array being Walking 1st and Biking 1st
    bikeRouteFetch();
    walkRouteFetch();
  }

  return (
    <div className="locationFormContainer">
      <form action="submit" className="wrapper locationForm" onSubmit={handleLocationSubmit}>
        <div className="locationInputs">
          <label htmlFor="currentLocation">Current Location:</label>
          <input type="text" id="currentLocation" onChange={handleLocationInput}></input>

          <label htmlFor="destination">Your Destination:</label>
          <input type="text" id="destination" onChange={handleDestinationInput}></input>
        </div>

        <div className="locationButtonContainer">
          <button type="submit" className="locationButton"><FaArrowCircleRight /></button>
        </div>
      </form>
      
    </div>
  )
}

export default LocationForm;