// LocationForm.js
import { FaArrowCircleRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FaWalking, FaBicycle } from 'react-icons/fa'
import timeConverter from '../utilities/timeConverter.js'


const LocationForm = ({handleCommuteTime}) => {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [walkResponse, setWalkResponse] = useState([])
  const [bikeResponse, setBikeResponse] = useState([])
  const [tempWalk, setTempWalk] = useState([])
  const [tempBike, setTempBike] = useState([])

  const mapQuestKey = '85d9QlTc92OXzKSDUGGbDDMPZQteWDr0';
  
  useEffect (()=>{

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
        setTempWalk(routeObject)
      })

  }, [walkResponse])

  useEffect(() => {
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
        setTempBike(routeObject)
      })

  }, [bikeResponse])


  const handleLocationInput = (event) => {
      setLocation(event.target.value)
  }

  const handleDestinationInput = (event) => {
      setDestination(event.target.value)
  }

  const handleLocationSubmit = (event) => {
    event.preventDefault();
    setWalkResponse(tempWalk)
    setBikeResponse(tempBike)
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

    <div className="wrapper transportationContainer">
        <p>Suggested Mode of Transportation</p>
        <div className="transportIconContainer">

            <button onClick={() => { handleCommuteTime(walkResponse.realTime) }} className="walkButton">
              <FaWalking />
              <p>Walking Time {timeConverter(walkResponse.realTime)}</p>
              <p>Walking Distance {walkResponse.distance ? (walkResponse.distance).toFixed(1) : 'why you walk?'}km</p> 
            </button>
          
            <button onClick={() => { handleCommuteTime(bikeResponse.realTime) }} className="bikeButton">
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