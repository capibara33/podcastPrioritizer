// LocationForm.js
import { FaArrowCircleRight } from 'react-icons/fa';
import { useState } from 'react';
import { FaWalking, FaBicycle } from 'react-icons/fa'
import timeConverter from '../utilities/timeConverter.js'


const LocationForm = ({handleCommuteTime}) => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [walkResponse, setWalkResponse] = useState([])
  const [bikeResponse, setBikeResponse] = useState([])
  const [highlightWalk, setHighlightWalk] = useState(false)
  const [highlightBike, setHighlightBike] = useState(false)
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
  
  const walking = () => {
    const mapQuestURL = new URL(`http://www.mapquestapi.com/directions/v2/route`)
    
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
      setWalkResponse(routeObject)
    })

  }
    
  const biking = () => {
    const mapQuestURL = new URL(`http://www.mapquestapi.com/directions/v2/route`)
    
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
      setBikeResponse(routeObject)
    })
  }
      
  const handleLocationSubmit = (event) => {
    event.preventDefault();
    walking();
    biking();
  }
      
  const handleLocationInput = (event) => {
    setLocation(event.target.value)
  }
  
  const handleDestinationInput = (event) => {
    setDestination(event.target.value)
  }

  const handleLightWalk = () => {
    if (!highlightWalk) {
      setHighlightBike(!highlightBike)
      setHighlightWalk(!highlightWalk)
    }
  }

  const handleLightBike = () => {
    if (!highlightBike) {
      setHighlightBike(!highlightBike)
      setHighlightWalk(!highlightWalk)
    }
  }

  return (
    <>
    <div className="locationFormContainer">
      <form action="submit" className="wrapper locationForm" onSubmit={handleLocationSubmit}>
        <div className="locationInputs">
          <label htmlFor="currentLocation">Current Location:</label>
          <input required type="text" id="currentLocation" onChange={handleLocationInput} value={location}></input>

          <label htmlFor="destination">Your Destination:</label>
          <input required type="text" id="destination" onChange={handleDestinationInput} value={destination}></input>
        </div>

        <div className="locationButtonContainer">
          <button type="submit" className="locationButton"><FaArrowCircleRight /></button>
        </div>
      </form>
    </div>

    <div className="wrapper transportationContainer">
        <p>Choose Mode of Transportation</p>
        <div className="transportIconContainer">
          
            <button 
            className={highlightWalk ? 'highlight' : ''} 
            onClick={()=>{
              handleCommuteTime(walkResponse.realTime);handleLightWalk();
              staticMap(walkResponse.sessionId);
              }}>
              <FaWalking />
              <p>Walking Time {timeConverter(walkResponse.realTime)}</p>
              <p>Walking Distance {walkResponse.distance ? (walkResponse.distance).toFixed(1) : 'why you walk?'}km</p> 
            </button>
            <button className={highlightBike ? 'highlight' : ''} onClick={()=>{
              handleCommuteTime(bikeResponse.realTime);handleLightBike();
              staticMap(bikeResponse.sessionId);
              }}>

              <FaBicycle />
              <p>Biking Time {timeConverter(bikeResponse.realTime)}</p>
              {/* <p>Biking Distance {bikeResponse.distance ? (bikeResponse.distance).toFixed(1) : 'careful with headphones bro '}km</p> */}
              {bikeResponse.distance 
              ? <p>Biking Distance {(bikeResponse.distance).toFixed(1)}km</p>

              : <p>Careful with headphones bro</p> }
{/*               
              (bikeResponse.distance).toFixed(1) : 'careful with headphones bro ' */}
            
            </button>
        </div>
        <div className="mapContainer">
          {mapResults ?
            <img className="mapResult" src={mapResults} aria-label={`image of a map showing a route from ${location} to ${destination}`}></img> : <img className="mapResult" src="http://placecorgi.com/250"></img>}
        </div>
    </div>
    </>
  )
}

export default LocationForm;