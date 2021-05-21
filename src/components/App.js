import { Fragment } from 'react';
import '../styles/App.css';
import LandingPage from './LandingPage.js';


import PodcastSearch from './PodcastSearch.js'

function App() {
  return (
    <Fragment>
      <LandingPage />
      <PodcastSearch />
    </Fragment>
  );
}

export default App;
