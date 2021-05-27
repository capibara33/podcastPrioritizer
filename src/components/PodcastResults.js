import Swal from 'sweetalert2';
import { FiExternalLink } from 'react-icons/fi';
import timeConverter from '../utilities/timeConverter.js';
import { animateScroll as scroll } from 'react-scroll';

const PodcastResults = (props) => {
    const { podcastInfo } = props

    const toTop = () => {
        scroll.scrollToTop();
    }

    return (

        <section className="podcastResults" name="results" id="results">
            {/* This ternary allows the h2 to append if the array is not empty */}
            {podcastInfo.length !== 0 && <h2> Step 4: Pick a podcast.</h2>}
            <div className="wrapper podcastResultsContainer">
                <ul className="podcastsList">
                    {/* This ternary maps through the podcast components when it receives data from the podcast form */}
                    {podcastInfo ? podcastInfo.map(({ podcastTitle, episodeTitle, episodeImage, episodeDescription, episodeLengthInSec, episodeAudio }, index) => {
                        return (
                            <li key={index}>
                                <div className="liContainer">
                                    <div className="podcastTitleContainer">
                                        <img className="podcastImage" src={episodeImage} alt="" />
                                        <h3 className="resultsTitle">{podcastTitle}</h3>
                                    </div>
                                    <div className="podcastInfoContainer">
                                        <p>Episode: {episodeTitle}</p>
                                        <p>Length: {timeConverter(episodeLengthInSec)}</p>
                                    </div>
                                    <div className="podcastInfoButtonContainer">
                                        <button aria-label={`Description for ${podcastTitle}`} className="learnMoreButton" onClick={() => {
                                            Swal.fire({
                                                title: podcastTitle,
                                                text: episodeDescription,
                                                confirmButtonText: "Return",
                                                confirmButtonColor: "#F97068",
                                                padding: "0"
                                            })
                                        }
                                        }>Learn More</button>
                                        <a className="listenLink" aria-label={`External link to audio of ${episodeTitle}`} target="_blank" href={episodeAudio} rel="noreferrer">Listen Here <FiExternalLink /> </a>

                                    </div>
                                </div>
                            </li>
                        )
                    })
                        // this is the end of ternary - if there is no podcast, an empty <p> tag will take its place
                        : <p></p>
                    }
                </ul>
            </div>
            <div className="wrapper scrollButtonContainer">
                <button className="scrollToTop" onClick={toTop}>Scroll to top</button>
            </div>
        </section>
    )
}

export default PodcastResults