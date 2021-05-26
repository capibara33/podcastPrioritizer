import Swal from 'sweetalert2';
import { FiExternalLink } from 'react-icons/fi';
import timeConverter from '../utilities/timeConverter.js';
import { animateScroll as scroll } from 'react-scroll';

const PodcastResults = (props) => {
    const {podcastInfo} = props

    const toTop = () => {
        scroll.scrollToTop();
    }

    console.log(podcastInfo)

    return (
        <section className="podcastResults">
            {/* This ternary allows the h2 to append if the array is not empty */}
            {podcastInfo.length !== 0 && <h2> Step 4: Profit</h2>}

            {/* This ternary maps through the podcast components when it receives information from the podcast form */}
            {podcastInfo ? podcastInfo.map(({ podcastTitle, episodeTitle, episodeImage, episodeDescription, episodeLengthInSec, episodeAudio}, index)=>{
                return(
                    <div className="wrapper podcastResultsContainer">
                        <ul className="podcastsList">
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
            // this is the end of ternary - if there is no podcast, an empty <p> tag will take its place
            : <p></p>
            }
            <div className="wrapper scrollButtonContainer">
                <button className="scrollToTop" onClick={ toTop }>Scroll to top</button>
            </div>
        </section>
    )
}

export default PodcastResults