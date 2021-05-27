import { FaArrowCircleRight } from 'react-icons/fa';
import { useState } from 'react'

const PodcastSearch = (props) => {
	const podcastURL = new URL('https://listen-api.listennotes.com/api/v2/search')
	const podcastKey = '293a53ed0c034ba8b5384c3905a13cc1';
	const [userSearch, setUserSearch] = useState('');
	const { handlePodcastData, commuteTime } = props;
	
	const commuteInMinutes = Math.floor(commuteTime / 60);
	
	const suggestedUserSearch = ["music", "movies", "art", "dance", "programming", "ants", "travel", "news", "sports", "food", "paranormal", "books", "true crime", "tv", "comedy", "video games", "aliens", "acting", "photography", "dogs", "cats", "design"]

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

			const podcastArray = podcastData.map((podcast) => {
				return {
					podcastTitle:podcast.podcast_title_original,
					episodeTitle:podcast.title_original,
					episodeImage:podcast.image,
					episodeDescription:podcast.description_original,
					episodeAudio:podcast.audio,
					episodeLengthInSec:podcast.audio_length_sec
				}
			})
		handlePodcastData(podcastArray)
		})
	})

	const selectRandomSearch = (array) => {
		const randomIndex = array[Math.floor(Math.random() * array.length)];
		setUserSearch(randomIndex)
		podcastFetch(randomIndex);
	}


	const handleSubmit = (event) => {
		event.preventDefault();
		podcastFetch(userSearch);
	}

	const handlePodcastSearch = (event) => {
		setUserSearch(event.target.value)
	}

	const handleRandomButtonClick = () => {
		selectRandomSearch(suggestedUserSearch);
	}
	
	// THIS SECTION IS STEP 3
	return(
		<section className="wrapper podcastForm">
		{commuteTime === 0 ? '' : 
		<>
			<h2>Step 3: Search for Podcast Title or Keyword.</h2>
			<form action=""className="podcastSearchForm" onSubmit={handleSubmit}>
				<label htmlFor="podcastSearch" aria-label="Step 3: Search for Podcast Title or Keyword."></label>
				<input type="text" placeholder="Corgis, Nicolas cage, Manga" id="podcastSearch" name="podcastSearch" onChange={handlePodcastSearch} value={userSearch} required/>
				<div className="podcastButtonContainer">
					<button className="podcastButton" type="submit"><FaArrowCircleRight /></button>
				</div>
			</form>
				<div className="randomPodcastContainer">
					<button className="randomPodcastButton" onClick={handleRandomButtonClick}>Want a suggestion?</button>
				</div>
		</>
		}
		</section>
	)
}

export default PodcastSearch;