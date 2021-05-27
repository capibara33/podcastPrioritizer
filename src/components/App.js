import { Fragment, useState } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';
import Footer from './Footer'

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
      <Footer />
    </Fragment>
  );
}

export default App;
