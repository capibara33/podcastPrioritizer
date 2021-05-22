import { Fragment, useState } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import TransportationMode from './TransportationMode';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';


function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const handleLocationData = (locationData) => {
    setLocation(locationData)
  }

  const handleDestinationData = (destinationData) => {
    setDestination(destinationData)
  }

  const handlePodcastData = (data) => {
    setPodcasts(data);
  }

  return (

    <Fragment>
      <LandingPage />
      
      <main>
        <LocationForm handleLocationData={handleLocationData} handleDestinationData={handleDestinationData} location={location} destination={destination}/>
        <TransportationMode />
        <PodcastSearch handlePodcastData={handlePodcastData}/>
        <PodcastResults podcastInfo={podcasts} />
      </main>

      <footer>Made by Team CAPIbara: Clement Sung, Aubrey Kazdan, Paul Szadurski and Ilya Marvin</footer>

    </Fragment>
  );
}

export default App;
