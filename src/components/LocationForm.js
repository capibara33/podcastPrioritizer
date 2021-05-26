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
    if (highlightBike) {
      setHighlightBike(!highlightBike)
      setHighlightWalk(!highlightWalk)
    }
    else {
      setHighlightWalk(!highlightWalk)
    }
  }

  const handleLightBike = () => {
    if (highlightWalk) {
      setHighlightBike(!highlightBike)
      setHighlightWalk(!highlightWalk)
    }
    else {
      setHighlightBike(!highlightBike)
    }
  }

  return (
    <>
    <div className="locationFormContainer">
      <form action="submit" className="wrapper locationForm" onSubmit={handleLocationSubmit}>
        <div className="locationInputs">
          <label htmlFor="currentLocation">Current Location:</label>
          <input  placeholder="483 Queen St W Toronto" required type="text" id="currentLocation" onChange={handleLocationInput} value={location}></input>

          <label htmlFor="destination">Your Destination:</label>
          <input placeholder="1 Blue Jays Way Toronto" required type="text" id="destination" onChange={handleDestinationInput} value={destination}></input>
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
              <p>Walking Time: {timeConverter(walkResponse.realTime)}</p>

              {walkResponse.distance
              ? <p>Walking Distance: {(walkResponse.distance).toFixed(1)}km</p>

              : <p>Walking Distance:</p> }


            </button>
            <button className={highlightBike ? 'highlight' : ''} onClick={()=>{
              handleCommuteTime(bikeResponse.realTime);handleLightBike();
              staticMap(bikeResponse.sessionId);
              }}>

              <FaBicycle />
              <p>Biking Time: {timeConverter(bikeResponse.realTime)}</p>

              {bikeResponse.distance 
              ? <p>Biking Distance {(bikeResponse.distance).toFixed(1)}km</p>

              : <p>Biking Distance:</p> }
            
            </button>
        </div>
        <div className="mapContainer">
          {mapResults ?
            <img className="mapResult" src={mapResults} alt={`map showing a route from ${location} to ${destination}`}></img> : <img className="mapResult" src="https://www.placecage.com/200/300" alt="pictures of nicolas cage"></img>}
        </div>
    </div>
    </>
  )
}

export default LocationForm;