import Swal from 'sweetalert2';
import { FiExternalLink } from 'react-icons/fi';
import timeConverter from '../utilities/timeConverter.js';
import { animateScroll as scroll } from 'react-scroll';

const PodcastResults = (props) => {
    const {podcastInfo} = props

    const toTop = () => {
        scroll.scrollToTop();
    }


    return (
        <section className="podcastResults">
                {
                    podcastInfo ? podcastInfo.map(({ podcastTitle, episodeTitle, episodeImage, episodeDescription, episodeLengthInSec, episodeAudio}, index)=>{
                        return(
                        <div className="wrapper podcastResultsContainer">
                            <h2>List of Podcasts</h2>
                            <ul className="podcastsList">
                                <li key={index}>
                                    <div className="liContainer">
                                        <div className="podcastTitleContainer">
                                            <img className="podcastImage" src={episodeImage} alt="" />
                                            <h3 className="resultsTitle">{podcastTitle}</h3>
                                        </div>
                                        <p>Episode title: {episodeTitle}</p>
                                        <p>Length: {timeConverter(episodeLengthInSec)}</p>
                                        <div className="podcastInfoContainer">
                                            <button aria-label={`Description for ${podcastTitle}`} className="podcastInfoButton" onClick={() => {
                                                Swal.fire({
                                                    title: podcastTitle,
                                                    text: episodeDescription,
                                                    time: episodeLengthInSec,
                                                    confirmButtonText: "Return",
                                                    padding:"10px"
                                                    })
                                                }
                                            }>Learn More</button>
                                        <a className="listenLink" aria-label={`External link to audio of ${episodeTitle}`} target="_blank" href={episodeAudio} rel="noreferrer">Listen Here <FiExternalLink /></a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div> 
                        ) 
                    })
                    : <p></p>
                }
                <div className="wrapper scrollButtonContainer">
                    <button className="scrollToTop" onClick={ toTop }>Scroll to top</button>
                </div>
        </section>
    )
}

export default PodcastResults