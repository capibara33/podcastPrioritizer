import { Fragment, useState } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import TransportationMode from './TransportationMode';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';


function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [mapData, setMapData] = useState([]);
  // const mapDataArray = [];
  // const handleLocationData = (locationData) => {
  //   setLocation(locationData)
  // }

  // const handleDestinationData = (destinationData) => {
  //   setDestination(destinationData)
  // }

  const handlePodcastData = (data) => {
    setPodcasts(data);
  }

  const handleMapData = (mapData) => {
    // mapDataArray.push(mapData);
    // setMapData(mapDataArray);
    // console.log(mapDataArray)
  }

  return (
    
    <Fragment>
      <LandingPage />
      
      <main>
        <LocationForm setMapData={handleMapData}/>
        {/* <TransportationMode setMapData={mapData} /> */}
        <PodcastSearch handlePodcastData={handlePodcastData}/>
        <PodcastResults podcastInfo={podcasts} />
      </main>

      <footer>Made by Team CAPIbara: Clement Sung, Aubrey Kazdan, Paul Szadurski and Ilya Marvin</footer>

    </Fragment>
  );
}

export default App;
