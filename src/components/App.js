import { Fragment, useState } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';


function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [commuteTime, setCommuteTime] = useState(0);


  const handlePodcastData = (data) => {
    setPodcasts(data);
  }

  const handleCommuteTime = (time) => {
    setCommuteTime(time)
  }

  return (
    
    <Fragment>
      <div className="content">
      <LandingPage />
      
      <main>
        <LocationForm 
        handleCommuteTime={handleCommuteTime}/>
        <PodcastSearch handlePodcastData={handlePodcastData} commuteTime={commuteTime}/>
        <PodcastResults podcastInfo={podcasts} />
      </main>

      </div>
      <footer>
        <p className="githubLinks">
          Team CAPIbara is: 
          <a href="https://github.com/clembrulee"> Clement Sung</a>, 
          <a href="https://github.com/aubreykazdan"> Aubrey Kazdan</a>, 
          <a href="https://github.com/PaulSzadurski"> Paul Szadurski </a> 
          and
          <a href="https://github.com/IlyaMarvinIlyashyk"> Ilya Marvin</a> 
        </p>

        <p>Made @ <a href="https://junocollege.com/">Juno College </a>2021</p>

        <img src={process.env.PUBLIC_URL + 'listennotesLogo.png'} alt="powered by listen notes logo" className="listennotesLogo"/> 
      </footer>

    </Fragment>
  );
}

export default App;
