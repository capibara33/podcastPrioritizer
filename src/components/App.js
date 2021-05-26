import { Fragment, useState } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';
// import { animateScroll as scroll } from 'react-scroll';
// import listennotesLogo from '../assets/listennotesLogo.png';


function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [commuteTime, setCommuteTime] = useState(0);


  const handlePodcastData = (data) => {
    setPodcasts(data);
  }

  const handleCommuteTime = (time) => {
    setCommuteTime(time)
  }
  
  // const toTop = () => {
  //   scroll.scrollToTop();
  // }

  return (
    
    <Fragment>
      <LandingPage />
      
      <main>
        <LocationForm 
        handleCommuteTime={handleCommuteTime}/>
        <PodcastSearch handlePodcastData={handlePodcastData} commuteTime={commuteTime}/>
        <PodcastResults podcastInfo={podcasts} />
      </main>
      {/* <div className="wrapper scrollButtonContainer">
        <button className="scrollToTop" onClick={ toTop }>Scroll to top</button>
      </div> */}

      <footer>
        <p>Made by Team CAPIbara: Clement Sung, Aubrey Kazdan, Paul Szadurski and Ilya Marvin</p>
        <p>Made @ <a href="https://junocollege.com/">Juno College </a>2021</p>
        <img src={process.env.PUBLIC_URL + 'listennotesLogo.png'} alt="powered by listen notes logo" className="listennotesLogo"/> 
      </footer>

    </Fragment>
  );
}

export default App;
