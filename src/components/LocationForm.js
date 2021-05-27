// LocationForm.js
import { BiCurrentLocation } from 'react-icons/bi';
import { useState } from 'react';
import { FaWalking, FaBicycle, FaArrowCircleRight} from 'react-icons/fa'
import timeConverter from '../utilities/timeConverter.js'
import Giphy from './Giphy.js'
import Swal from 'sweetalert2'


const LocationForm = ({handleCommuteTime}) => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [walkResponse, setWalkResponse] = useState([])
  const [bikeResponse, setBikeResponse] = useState([])
  const [mapResults, setMapResult] = useState('');

  const mapQuestKey = 'tGIT7B6LGU7ji3ITYatLKJcdWNx98cKq';

const staticMap = (sessionId) => {
  if (!sessionId) {
    alert('plz write something');
  } else {
  const staticURL = new URL('https://www.mapquestapi.com/staticmap/v5/map')
  staticURL.search = new URLSearchParams({
    key: mapQuestKey,
    session: sessionId
  })
  setMapResult(staticURL)
  }
}

const noRoute = () => {
  Swal.fire({
    title: 'No route found',
    text: 'Route does not exist, try to be more specific',
    confirmButtonText: "Return",
    confirmButtonColor: "#F97068",
    padding: "0"
  })
}
  
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

      if (routeObject.distance === 0) {
        noRoute();
      } else {
        setWalkResponse(routeObject);
      }
    })
  }
    
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
      console.log(routeObject.distance);
      
      if (routeObject.distance === 0) {
        noRoute();
      } else {
        setBikeResponse(routeObject);
      }
    })
  }
      
  const handleLocationSubmit = (event) => {
    event.preventDefault();
    setMapResult('');
    walking();
    biking();
  }
      
  const handleLocationInput = (event) => {
    setLocation(event.target.value)
  }
  
  const handleDestinationInput = (event) => {
    setDestination(event.target.value)
  }

  // current location 

  const myLocation = () => {
    const locationFinder = (pos) => {
      let crd = pos.coords;
      let currentLocation =`${crd.latitude}, ${crd.longitude}`
      setLocation(currentLocation)
    }
    navigator.geolocation.getCurrentPosition(locationFinder);
  }

  return (
    <div className="fadeIn">
      <h2>Step 1: Pick a location AND destination to get started.</h2>
      <p className="stepOneNote">*** Add a city to the end of address for specificity ***</p>
      <p className="stepOneNote">Click on <BiCurrentLocation /> icon to give your current location.</p>
      <div className="locationFormContainer">
        <form action="submit" className="wrapper locationForm" onSubmit={handleLocationSubmit}>
          <div className="locationInputs">

            <div className="currentLocation">
              <label htmlFor="currentLocation">Starting Location:</label>
              <input  placeholder="483 Queen St W Toronto" required type="text" id="currentLocation" onChange={handleLocationInput} value={location}></input>

              <button type="button" aria-label="use your current location" className="myLocation" onClick={() => { myLocation() }}><BiCurrentLocation /></button>
            </div>

            <label htmlFor="destination">Your Destination:</label>
            <input placeholder="1 Blue Jays Way Toronto" required type="text" id="destination" onChange={handleDestinationInput} value={destination}></input>
          </div>

          <div className="locationButtonContainer">
            <button type="submit" className="locationButton"><FaArrowCircleRight /></button>
          </div>
        </form>
      </div>

      {walkResponse.length === 0 ? '' :
        <div className="wrapper transportationContainer fadeIn">
            <h2>Step 2: Tell us how you want to get there.</h2>
            <p className="stepTwoNote">***We do not recommend using headphones while biking. Use your best judgement***</p>
            <div className="transportIconContainer">
              <button aria-label="transportation method: walk"
                onClick={()=>{
                handleCommuteTime(walkResponse.realTime);
                staticMap(walkResponse.sessionId);
                }}>
                  
                <FaWalking />
                <p>Time: {timeConverter(walkResponse.realTime)}</p>

                {walkResponse.distance
                ? <p>Distance: {(walkResponse.distance).toFixed(1)} km</p>
                : <p>Distance:</p> }
              </button>

              <button aria-label="transportation method: bicycle" onClick={()=>{
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
      <div className="mapContainer">
        {mapResults 
          ? <img className="mapResult fadeIn" src={mapResults} alt={`map showing a route from ${location} to ${destination}`}></img>
          : <Giphy />
        }
      </div>
    </div>
  )
}

export default LocationForm;
