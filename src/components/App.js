import { Fragment, useState } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
// import TransportationMode from './TransportationMode';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';
import { animateScroll as scroll } from 'react-scroll'


function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [commuteTime, setCommuteTime] = useState(0)

  const handlePodcastData = (data) => {
    setPodcasts(data);
  }

  const handleCommuteTime = (time) => {
    setCommuteTime(time)
  }

  const toTop = () => {
    scroll.scrollToTop();
  }

  console.log(commuteTime)


  return (
    
    <Fragment>
      <LandingPage />
      
      <main>
        <LocationForm handleCommuteTime={handleCommuteTime}/>
        {/* <TransportationMode setMapData={mapData} /> */}
        <PodcastSearch handlePodcastData={handlePodcastData} commuteTime={commuteTime}/>
        <PodcastResults podcastInfo={podcasts} />
      </main>
      <button onClick={ toTop }>Scroll to top</button>

      <footer>Made by Team CAPIbara: Clement Sung, Aubrey Kazdan, Paul Szadurski and Ilya Marvin</footer>

    </Fragment>
  );
}

export default App;
