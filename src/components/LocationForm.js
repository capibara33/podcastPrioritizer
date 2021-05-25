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

const staticMap = () => {
  const staticURL = new URL('https://www.mapquestapi.com/staticmap/v5/map')
  staticURL.search = new URLSearchParams({
    key: mapQuestKey,
    start: location,
    end: destination
  })
  setMapResult(staticURL)
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
    staticMap();
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
    setHighlightWalk(!highlightWalk)}
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
          <input type="text" id="currentLocation" onChange={handleLocationInput} value={location}></input>

          <label htmlFor="destination">Your Destination:</label>
          <input type="text" id="destination" onChange={handleDestinationInput} value={destination}></input>
        </div>

        <div className="locationButtonContainer">
          <button type="submit" className="locationButton"><FaArrowCircleRight /></button>
        </div>
      </form>
    </div>
    <div>
      { mapResults ?
      <img className="mapResult" src={mapResults}></img> : null }
    </div>
    <div className="wrapper transportationContainer">
        <p>Suggested Mode of Transportation</p>
        <div className="transportIconContainer">
          
            <button 
            className={highlightWalk ? 'highlight' : ''} 
            onClick={()=>{
              handleCommuteTime(walkResponse.realTime);handleLightWalk()}}>
              <FaWalking />
              <p>Walking Time {timeConverter(walkResponse.realTime)}</p>
              <p>Walking Distance {walkResponse.distance ? (walkResponse.distance).toFixed(1) : 'why you walk?'}km</p> 
            </button>
            <button className={highlightBike ? 'highlight' : ''} onClick={()=>{
              handleCommuteTime(bikeResponse.realTime);handleLightBike()}}>

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
    </div>
    </>
  )
}

export default LocationForm;