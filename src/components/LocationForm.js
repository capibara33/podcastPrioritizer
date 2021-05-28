// import useState hook from react library
import { useState } from 'react';
//import icon for current location button 
import { BiCurrentLocation } from 'react-icons/bi';
// import walking, biking and arrow icons 
import { FaWalking, FaBicycle, FaArrowCircleRight } from 'react-icons/fa'
// import time converting function from utilities folder
import timeConverter from '../utilities/timeConverter.js'
// import giphy component
import Giphy from './Giphy.js'
// import sweet alert
import Swal from 'sweetalert2'


const LocationForm = (props) => {
  // created states for user's location, user's destination, walk response, bike response, mapreseults
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [walkResponse, setWalkResponse] = useState([])
  const [bikeResponse, setBikeResponse] = useState([])
  const [mapResults, setMapResult] = useState('');
  // destructure props
  const { handleCommuteTime } = props

  const mapQuestKey = 'tGIT7B6LGU7ji3ITYatLKJcdWNx98cKq';

  // static map function to set the image when map data is returned
  const staticMap = (sessionId) => {
    if (!sessionId) {
      Swal.fire({
        title: 'No route found',
        text: 'Route does not exist, try to be more specific',
        confirmButtonText: "Return",
        confirmButtonColor: "#F97068",
        padding: "0"
      })
    } else {
      const staticURL = new URL('https://www.mapquestapi.com/staticmap/v5/map')
      staticURL.search = new URLSearchParams({
        key: mapQuestKey,
        session: sessionId
      })
      setMapResult(staticURL)
    }
  }

  // error handling when distance
  const noRoute = () => {
    Swal.fire({
      title: 'No route found',
      text: 'Route does not exist, try to be more specific',
      confirmButtonText: "Return",
      confirmButtonColor: "#F97068",
      padding: "0"
    })
  }

  // walking fetch API call
  const walking = () => {
    const mapQuestURL = new URL(`https://www.mapquestapi.com/directions/v2/route`)

    mapQuestURL.search = new URLSearchParams({
      key: mapQuestKey,
      from: location,
      to: destination,
      unit: 'k',
      routeType: 'pedestrian'
    })
    fetch(mapQuestURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        const routeObject = jsonResponse.route;
        // set walkResponse if the distance from the API returned is not 0
        if (routeObject.distance === 0) {
          noRoute();
        } else {
          setWalkResponse(routeObject);
        }
      })
  }

  // biking fetch API call
  const biking = () => {
    const mapQuestURL = new URL(`https://www.mapquestapi.com/directions/v2/route`)

    mapQuestURL.search = new URLSearchParams({
      key: mapQuestKey,
      from: location,
      to: destination,
      unit: 'k',
      routeType: 'bicycle'
    })
    fetch(mapQuestURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        const routeObject = jsonResponse.route;
        // set bikeResponse if the distance from the API returned is not 0
        if (routeObject.distance === 0) {
          noRoute();
        } else {
          setBikeResponse(routeObject);
        }
      })
  }

  // handler function on form submit
  const handleLocationSubmit = (event) => {
    event.preventDefault();
    setMapResult('');
    walking();
    biking();
  }

  // handler function to set user's location 
  const handleLocationInput = (event) => {
    setLocation(event.target.value)
  }

  // handler function to set user's destination
  const handleDestinationInput = (event) => {
    setDestination(event.target.value)
  }


  // current location function to get geo location 
  const myLocation = () => {
    const locationFinder = (pos) => {
      let crd = pos.coords;
      let currentLocation = `${crd.latitude}, ${crd.longitude}`
      setLocation(currentLocation)
    }
    navigator.geolocation.getCurrentPosition(locationFinder);
  }

  // render Location form component
  return (
    <div className="fadeIn">
      <h2>Step 1: Pick a location AND destination to get started.</h2>
      <p className="stepOneNote">Add a city to the end of address for specificity.</p>
      <p className="stepOneNote">Click on <BiCurrentLocation /> icon to give your current location.</p>
      <div className="locationFormContainer">
        <form action="submit" className="wrapper locationForm" onSubmit={handleLocationSubmit}>
          <div className="locationInputs">
            <div className="currentLocation">
              {/* Current location input */}
              <label htmlFor="currentLocation">Your Location:</label>
              <input placeholder="483 Queen St W Toronto" required type="text" id="currentLocation" onChange={handleLocationInput} value={location}></input>

              <button type="button" aria-label="use your current location" className="myLocation" onClick={() => { myLocation() }}><BiCurrentLocation /></button>
            </div>
            {/* Destination input */}
            <label htmlFor="destination">Your Destination:</label>
            <input placeholder="1 Blue Jays Way Toronto" required type="text" id="destination" onChange={handleDestinationInput} value={destination}></input>
          </div>
          {/* Submit button for form submit  */}
          <div className="locationButtonContainer">
            <button type="submit" className="locationButton"><FaArrowCircleRight /></button>
          </div>
        </form>
        {/* Transportation mode container */}
      </div>

      {walkResponse.length === 0 ? '' :
      <div className="wrapper transportationContainer">
        <h2>Step 2: Tell us how you want to get there.</h2>
        <p className="stepTwoNote">We do not recommend using headphones while biking. Use your best judgement.</p>
        <div className="transportIconContainer">
          <button aria-label="transportation method: walk"
            onClick={() => {
              handleCommuteTime(walkResponse.realTime);
              staticMap(walkResponse.sessionId);
            }}>
            <FaWalking />
            <p>Time: {timeConverter(walkResponse.realTime)}</p>
            {walkResponse.distance
              ? <p>Distance: {(walkResponse.distance).toFixed(1)} km</p>
              : <p>Distance:</p>}
          </button>
          <button aria-label="transportation method: bicycle" onClick={() => {
            handleCommuteTime(bikeResponse.realTime);
            staticMap(bikeResponse.sessionId);
          }}>
            <FaBicycle />
            <p>Time: {timeConverter(bikeResponse.realTime)}</p>
            {bikeResponse.distance
              ? <p>Distance {(bikeResponse.distance).toFixed(1)} km</p>
              : <p>Distance:</p>
            }
          </button>
        </div>
      </div>
    }
      {/* map results container displays when user selects a mode of transport */}
      <div className="mapContainer">
        {mapResults 
          ? <img className="mapResult fadeIn" src={mapResults} alt={`map showing a route from ${location} to ${destination}`}></img>
          // else displays default giphy image
          : <Giphy />
        }
      </div>
    </div>
  )
}

export default LocationForm;
