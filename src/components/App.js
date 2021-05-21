import { Fragment } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import TransportationMode from './TransportationMode';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';

function App() {

  const podcastURL = new URL('https://listen-api.listennotes.com/api/v2/search')

  podcastURL.search = new URLSearchParams({
    q: 'star wars'
  })
  
  fetch(podcastURL, {
    method: "GET",
    headers: {'X-ListenAPI-Key': '293a53ed0c034ba8b5384c3905a13cc1'}
  })
    .then((data) => {
      return data.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse)
    })


  return (
    <Fragment>
      <LandingPage />
      
      <main>
        <LocationForm />
        <TransportationMode />
        <PodcastSearch />
        <PodcastResults />
      </main>

      <footer>Team CAPIbara is: Clement Sung, Aubrey Kazdan, Paul Szadurski and Ilya Marvin</footer>

    </Fragment>
  );
}

export default App;
