// import sweet alert
import Swal from 'sweetalert2';
// import external link icon 
import { FiExternalLink } from 'react-icons/fi';
// import time converter function from utilities folder
import timeConverter from '../utilities/timeConverter.js';


const PodcastResults = (props) => {
  // destructured the props
  const { podcastInfo } = props

// render podcast results section
  return (
    <section className="podcastResults" name="results" id="results">
      {/* This ternary allows the h2 to append if the array is not empty */}
      {podcastInfo.length !== 0 && <h2> Step 4: Pick a podcast.</h2>}
      <div className="wrapper podcastResultsContainer">
        <ul className="podcastsList">
          {podcastInfo.map(({ podcastTitle, episodeTitle, episodeImage, episodeDescription, episodeLengthInSec, episodeAudio }, index) => {
            return (
              <li key={index}>
                <div className="liContainer">
                  <div className="podcastTitleContainer">
                    <img className="podcastImage" src={episodeImage} alt={`cover art for ${podcastTitle}`} />
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
        }
        </ul>
      </div>
    </section>
  )
}

export default PodcastResults