const Footer = () => {
  return(
    <footer>
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
      <img src={process.env.PUBLIC_URL + 'listennotesLogo.png'} alt="powered by listen notes logo" className="listennotesLogo" />
    </footer>
  )
}

export default Footer;