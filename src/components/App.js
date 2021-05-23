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
  const [highlightWalk, setHighlightWalk] = useState(false)
  const [highlightBike, setHighlightBike] = useState(false)

  const handlePodcastData = (data) => {
    setPodcasts(data);
  }

  const handleCommuteTime = (time) => {
    setCommuteTime(time)
  }
  
  const handleLightWalk = ()=>{
    if (highlightBike) {
      setHighlightBike(!highlightBike)
      setHighlightWalk(!highlightWalk)
    }
    else {setHighlightWalk(!highlightWalk)}
  }

  const handleLightBike = () =>{
    if (highlightWalk) {
      setHighlightBike(!highlightBike)
      setHighlightWalk(!highlightWalk)
    }
    else {
      setHighlightBike(!highlightBike)
    }
  }

  const toTop = () => {
    scroll.scrollToTop();
  }

  console.log(commuteTime)


  return (
    
    <Fragment>
      <LandingPage />
      
      <main>
        <LocationForm 
        handleCommuteTime={handleCommuteTime} 
        highlightWalk={highlightWalk} 
        handleLightWalk={handleLightWalk} 
        highlightBike={highlightBike}
        handleLightBike={handleLightBike}/>
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
