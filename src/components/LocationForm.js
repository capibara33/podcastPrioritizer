// LocationForm.js
import { FaArrowCircleRight } from 'react-icons/fa';


const LocationForm = ({handleLocationData, handleDestinationData, location, destination}) => {

  const mapQuestURL = new URL(`http://www.mapquestapi.com/directions/v2/route`)
  const mapQuestKey = 'yhn7INwuFvAefsr6GSedhz0ry1k94m6b';
  const mapCall = () => {
    fetch(mapQuestURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse.route);
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
    handleLocationData(event.target.value)
  }

  const handleDestinationInput = (event) => {
    handleDestinationData(event.target.value)
  }

  const handleLocationSubmit = (event) => {

    event.preventDefault();
    walkRouteFetch();
    bikeRouteFetch();
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