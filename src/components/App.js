import { Fragment } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage';
import LocationForm from './LocationForm';
import PodcastSearch from './PodcastSearch';
import PodcastResults from './PodcastResults';

function App() {
  return (
    <Fragment>
      


      <LandingPage />
      <LocationForm />
      <PodcastSearch />
      <PodcastResults />

    </Fragment>
  );
}

export default App;
