import { Fragment } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import TransportationMode from './TransportationMode';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';

function App() {

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
