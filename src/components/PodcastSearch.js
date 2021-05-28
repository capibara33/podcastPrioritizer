// import useState hook and fragment from react
import { useState } from 'react'
// import arrow icon
import { FaArrowCircleRight } from 'react-icons/fa';
// import scroll function to podcast results section
import { Link } from 'react-scroll';
// import sweet alert
import Swal from 'sweetalert2';

const PodcastSearch = (props) => {
  const podcastURL = new URL('https://listen-api.listennotes.com/api/v2/search')
  const podcastKey = '293a53ed0c034ba8b5384c3905a13cc1';
  // created userSearch state for storing user's podcast search
  const [userSearch, setUserSearch] = useState('');
  // destructured props passed in from App.js
  const { handlePodcastData, commuteTime } = props;
  // convert time in seconds from data to minutes for display
  const commuteInMinutes = Math.floor(commuteTime / 60);
  // created an array of assorted podcast topics 
  const suggestedUserSearch = ["music", "movies", "art", "dance", "ants", "travel", "news", "sports", "food", "paranormal", "books", "true crime", "tv", "comedy", "video games", "aliens", "acting", "photography", "dogs", "cats", "design"]

  // podcast fetch API call
  const podcastFetch = ((query) => {
    podcastURL.search = new URLSearchParams({
      q: query,
      len_min: commuteInMinutes,
      len_max: commuteInMinutes + 10,
    })
    fetch(podcastURL, {
      method: "GET",
      headers: { 'X-ListenAPI-Key': podcastKey }
    })
      .then((data) => {
        return data.json();
      })
      .then((jsonResponse) => {
        const podcastData = jsonResponse.results
        // create a podcastArray to store the data that we want
        const podcastArray = podcastData.map((podcast) => {
          return {
            podcastTitle: podcast.podcast_title_original,
            episodeTitle: podcast.title_original,
            episodeImage: podcast.image,
            episodeDescription: podcast.description_original,
            episodeAudio: podcast.audio,
            episodeLengthInSec: podcast.audio_length_sec
          }
        })
        // This conditional alerts the user if their podcast search does not bring up any results
        if (podcastData.length === 0) {
          Swal.fire({
            title: 'Podcasts not found',
            text: 'Try a smaller commute or a more general topic search.',
            confirmButtonText: "Return",
            confirmButtonColor: "#F97068",
            padding: "0"
          })
        } else {
          // return the podcastArray to App.js's handlePodcastData handler function
          handlePodcastData(podcastArray)
        }
      })
  })

  // handle form submit function
  const handleSubmit = (event) => {
    event.preventDefault();
    podcastFetch(userSearch);
  }

  // handle user's podcast search entry
  const handlePodcastSearch = (event) => {
    setUserSearch(event.target.value)
  }

  // function to select a random podcast to set to state
  const selectRandomSearch = (array) => {
    const randomIndex = array[Math.floor(Math.random() * array.length)];
    setUserSearch(randomIndex)
    podcastFetch(randomIndex);
  }

  // function to call the select random topic function
  const handleRandomButtonClick = () => {
    selectRandomSearch(suggestedUserSearch);
  }

  // render podcast search form 
  return (
    <section className="wrapper podcastForm">
      {commuteTime === 0 ? '' :
        <div className="fadeIn">
          <h2>Step 3: Search for Podcast by title, genre, or topic.</h2>
          <p className="stepThreeNote">Commutes longer than five hours may affect podcast results.</p>
          <form action="" className="podcastSearchForm">
            <label htmlFor="podcastSearch" aria-label="Step 3: Search for Podcast Title or Keyword."></label>
            <input type="text" placeholder="Corgis, Movies, Manga" id="podcastSearch" name="podcastSearch" onChange={handlePodcastSearch} value={userSearch} required />
            <div className="podcastButtonContainer">
              <Link to="results" smooth={true} delay={400}> <button className="podcastButton" type="submit" onClick={handleSubmit}><FaArrowCircleRight /></button></Link>
            </div>
          </form>

          <div className="randomPodcastContainer">
            <Link to="results" smooth={true} delay={400}> <button className="randomPodcastButton" onClick={handleRandomButtonClick}>Want a suggestion? </button></Link>
          </div>
        </div>
      }
    </section>
  )
}

export default PodcastSearch;
