
const PodcastResults = (props) => {
    const {podcastInfo} = props


    return (
        <section className="podcastResults">
            <div className="podcastResultsContainer">
                <h2>List of Podcasts</h2>
                <ul>
                {
                        podcastInfo.map(({ podcastTitle, episodeTitle, episodeImage, episodeDescription, episodeAudio}, index)=>{
                        return(
                            <li key={index}>
                                <h2>{podcastTitle}</h2>
                                <h3>{episodeTitle}</h3>
                                <img src={episodeImage} alt="" />
                                <p>{episodeDescription}</p>
                                <audio controls> 
                                    <source src={episodeAudio} type="audio/mpeg"/>
                                </audio>
                            </li>
                        ) 
                    })
                }
                    {/* <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, a?</li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, a?</li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, a?</li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, a?</li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, a?</li> */}
                </ul>
            </div> 
        </section>
    )
}

export default PodcastResults