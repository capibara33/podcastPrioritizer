import { FaArrowCircleRight } from 'react-icons/fa';
import { useState, useEffect } from 'react'

const PodcastSearch = (props) => {
	const podcastURL = new URL('https://listen-api.listennotes.com/api/v2/search')
	const { handlePodcastData } = props
	const [userSearch, setUserSearch] = useState('');

	const podcastFetch = (() => {
		
	podcastURL.search = new URLSearchParams({
		q: userSearch,
		len_min: 0,
		len_max: 180
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
			const podcastArray = podcastData.map((podcast) => {
				return {
					podcastTitle:podcast.title_original,
					episodeTitle:podcast.podcast_title_original,
					episodeImage:podcast.image,
					episodeDescription:podcast.description_original,
					episodeAudio:podcast.audio
				}
			})
			console.log(podcastArray)
			handlePodcastData(podcastArray)
			
		})
	})
	
	const handleSubmit = (event) => {
		event.preventDefault();
		podcastFetch();
	}

	const handlePodcastSearch = (event) => {
		setUserSearch(event.target.value)
	}


	return(
		<div>
			<form action="" onSubmit={handleSubmit}>
				<label htmlFor="podcastSearch" className="srOnly"></label>
				<input type="text" id="podcastSearch" name="podcastSearch" onChange={handlePodcastSearch} value={userSearch}/>
				<FaArrowCircleRight />
				<button>Random Podcast</button>
			</form>
		</div>
	)
}

export default PodcastSearch;