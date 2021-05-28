// import fragment and useState from react
import { Fragment, useState } from 'react';
// import stylesheet
import '../styles/App.css';
// import components
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';
import Footer from './Footer'

function App() {
  // create states for podcast data and commute data from mapquest and listenNotes API call
  const [podcasts, setPodcasts] = useState([]);
  const [commuteTime, setCommuteTime] = useState(0);

  // handler function to set commuteTime state from mapquest API data
  const handleCommuteTime = (time) => {
    setCommuteTime(time)
  }

  // handler function to set podcast data state from listenNotes API data
  const handlePodcastData = (data) => {
    setPodcasts(data);
  }

  // render App
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
