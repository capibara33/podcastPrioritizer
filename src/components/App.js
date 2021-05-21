import { Fragment } from 'react';
import '../styles/App.css';
import PodcastResults from './PodcastResults';
import LandingPage from './LandingPage.js';
import PodcastSearch from './PodcastSearch.js'

function App() {
  return (
    <Fragment>
      <LandingPage />
      <PodcastSearch />
      <PodcastResults />
    </Fragment>
  );
}

export default App;
