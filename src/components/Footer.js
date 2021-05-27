import { animateScroll as scroll } from 'react-scroll';


const Footer = () => {
  const toTop = () => {
    scroll.scrollToTop();
  }
  
  return(
    <footer>
      <div className="wrapper scrollButtonContainer">
          <button className="scrollToTop" onClick={toTop}>Scroll to top</button>
      </div>
      <p className="githubLinks">
        Team CAPIbara is:
        <a href="https://github.com/clembrulee"> Clement Sung</a>,
        <a href="https://github.com/aubreykazdan"> Aubrey Kazdan</a>,
        <a href="https://github.com/PaulSzadurski"> Paul Szadurski </a>
        and
        <a href="https://github.com/IlyaMarvinIlyashyk"> Ilya Marvin</a>
      </p>
      <p>Made @ <a href="https://junocollege.com/">Juno College </a>2021</p>
      <div>Favicon made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Mapquest API provided by <a href="https://developer.mapquest.com/">Mapquest</a> </div>
      <img src={process.env.PUBLIC_URL + 'listennotesLogo.png'} alt="powered by listen notes logo" className="listennotesLogo" />
    </footer>
  )
}

export default Footer;