import { FaArrowCircleRight } from 'react-icons/fa';
import { useState } from 'react'

const PodcastSearch = (props) => {
	const podcastURL = new URL('https://listen-api.listennotes.com/api/v2/search')
	const { handlePodcastData, commuteTime } = props
	const [userSearch, setUserSearch] = useState('');
	
	const commuteInMinutes = Math.floor(commuteTime / 60)
	
	const suggestedUserSearch = ["music", "movies", "art", "dance", "programming", "ants", "travel", "news", "sports", "food", "paranormal", "books", "true crime", "tv", "comedy", "video games", "aliens"]

	// console.log(commuteInMinutes + 10)

	const podcastFetch = ((query) => {
	
	
	podcastURL.search = new URLSearchParams({
		q: query,
		len_min: commuteInMinutes,
		len_max: commuteInMinutes + 10,
	})

	fetch(podcastURL, {
		method: "GET",
		headers: { 'X-ListenAPI-Key': '293a53ed0c034ba8b5384c3905a13cc1' }
	})
		.then((data) => {
			return data.json();
		})
		.then((jsonResponse) => {
			
			const podcastData = jsonResponse.results
			console.log(podcastData)
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
	

	return(
		<section className="wrapper podcastForm">
			<form action=""className="podcastSearchForm" onSubmit={handleSubmit}>
				<div className="podcastFormContainer">
					<label htmlFor="podcastSearch" >Search for Podcast Title or Keyword: </label>
					<input type="text" placeholder="Corgis, Nicolas cage, Manga" id="podcastSearch" name="podcastSearch" onChange={handlePodcastSearch} value={userSearch} required/>
				</div>
				<div className="podcastButtonContainer">
					<button className="podcastButton" type="submit"><FaArrowCircleRight /></button>
				</div>
			</form>
				<div className="randomPodcastContainer">
					<button className="randomPodcastButton" onClick={handleRandomButtonClick}>Need a suggestion?</button>
				</div>
		</section>
	)
}

export default PodcastSearch;