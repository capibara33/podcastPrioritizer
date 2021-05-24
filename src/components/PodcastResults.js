import Swal from 'sweetalert2';
import { FiExternalLink } from 'react-icons/fi';
import timeConverter from '../utilities/timeConverter.js';

const PodcastResults = (props) => {
    const {podcastInfo} = props
    console.log(props)

    return (
        <section className="podcastResults">
            <div className="wrapper podcastResultsContainer">
                <h2>List of Podcasts</h2>
                <ul className="podcastsList">
                {
                        podcastInfo.map(({ podcastTitle, episodeTitle, episodeImage, episodeDescription, episodeLengthInSec, episodeAudio}, index)=>{
                        return(
                            <li key={index}>
                                <div className="liContainer">
                                    <div className="podcastTitleContainer">
                                        <img src={episodeImage} alt="" />
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
                                        <a aria-label={`External link to audio of ${episodeTitle}`} target="_blank" href={episodeAudio}>Listen Here <FiExternalLink /> </a>
                                    {/* <audio controls> 
                                        <source src={episodeAudio} type="audio/mpeg"/>
                                    </audio> */}
                                    
                                    </div>
                                </div>
                            </li>
                        ) 
                    })
                }
                </ul>
            </div> 
        </section>
    )
}

export default PodcastResults