import { Fragment, useState } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import TransportationMode from './TransportationMode';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';


function App() {
  const [podcasts, setPodcasts] = useState([]);

  // const mapQuestURL = new URL(`http://www.mapquestapi.com/directions/v2/route`)
  // const mapQuestKey = 'yhn7INwuFvAefsr6GSedhz0ry1k94m6b';
  // mapQuestURL.search = new URLSearchParams({
  //   key: mapQuestKey,
  //   from: 'toronto',
  //   to: 'chicago'
  // })

  // fetch(mapQuestURL)
  // .then((response) => {
  //   return response.json();
  // })
  // .then((jsonResponse) => {
  //   console.log(jsonResponse);
  // })
  

  const handlePodcastData = (data) => {
    setPodcasts(data);
  }


  return (

    <Fragment>
      <LandingPage />
      
      <main>
        <LocationForm />
        <TransportationMode />
        <PodcastSearch handlePodcastData={handlePodcastData}/>
        <PodcastResults podcastInfo={podcasts} />
      </main>

      <footer>Team CAPIbara is: Clement Sung, Aubrey Kazdan, Paul Szadurski and Ilya Marvin</footer>

    </Fragment>
  );
}

export default App;
