import { FaArrowCircleRight } from 'react-icons/fa';
import { useState } from 'react'

const PodcastSearch = (props) => {
	const podcastURL = new URL('https://listen-api.listennotes.com/api/v2/search')
	const { handlePodcastData, commuteTime } = props
	const [userSearch, setUserSearch] = useState('');

	const commuteInMinutes = Math.floor(commuteTime / 60)

	// console.log(commuteInMinutes + 10)

	const podcastFetch = (() => {
	
	
	podcastURL.search = new URLSearchParams({
		q: userSearch,
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
	
	// const randomPodcastFetch = (() => {
	// 	const randomPodUrl = new URL('https://listen-api.listennotes.com/api/v2/just_listen')
		

	// 	fetch(randomPodUrl, {
	// 		method: "GET",
	// 		headers: { 'X-ListenAPI-Key': '293a53ed0c034ba8b5384c3905a13cc1' }
	// 	})
	// 		.then((data) => {
	// 			return data.json();
	// 		})
	// 		.then((jsonResponse) => {
	// 		console.log(jsonResponse)
	// 			const randomPodcast = jsonresponse// handlePodcastData()
	// 		})
	// })

	const handleSubmit = (event) => {
		event.preventDefault();
		podcastFetch();
	}

	const handlePodcastSearch = (event) => {
		setUserSearch(event.target.value)
	}

	// const handleRandomButtonClick = () => {
	// 	randomPodcastFetch();
	// }
	

	return(
		<section className="wrapper podcastForm">
			<form action=""className="podcastSearchForm" onSubmit={handleSubmit}>
				<label htmlFor="podcastSearch" className="srOnly"></label>
				<input type="text" id="podcastSearch" name="podcastSearch" onChange={handlePodcastSearch} value={userSearch}/>
				<button className="podcastButton" type="submit"><FaArrowCircleRight /></button>
			</form>
				<button className="randomPodcastButton" /*onClick={handleRandomButtonClick}*/>Random Podcast</button>
		</section>
	)
}

export default PodcastSearch;