// LocationForm.js
import { FaArrowCircleRight } from 'react-icons/fa';

const LocationForm = () => {
  return (
    <form action="submit" className="wrapper locationForm">
      <div>
        <label htmlFor="currentLocation">Current Location:</label>
        <input type="text" id="currentLocation"></input>

        <label htmlFor="destination">Your Destination:</label>
        <input type="text" id="destination"></input>
      </div>

      <div>
        <button type="submit" className="locationButton"><FaArrowCircleRight /></button>
      </div>
    </form>
  )
}

export default LocationForm;