// import useEffect and useState hooks, and fragment from react library
import { useEffect, useState, Fragment } from 'react'

const Giphy = () => {
  // create a giph state for giphy images
  const [giph, setGiph] = useState([]);

  // giphy API call 
  useEffect(() => {
    const giphyUrl = new URL(`https://api.giphy.com/v1/gifs`);
    giphyUrl.search = new URLSearchParams({
      api_key: 'HVo4BiCuwH7vyhWSzlAfRqhIp06cIt7O',
      ids: 'XeGljuPcbTPtfEwQVo, gFfd9ZgyukhImSYwPa, poqFvVAbhzqwrYqfSG,cIhkizr8QLITdoWSzC,ifGVZZ9QEEMs1ia0OJ,s9vFiYCdomuycLyT1X, j4zTSzrQVgBqcaGAHs, gi9knwzV2qZ9M80hUh'
    });

    fetch(giphyUrl)
      .then((giphyData) => {
        return giphyData.json();
      })
      .then((jsonGiphyResponse) => {
        const giphyArray = (jsonGiphyResponse.data);
        const randomGiph = giphyArray[Math.floor(Math.random() * giphyArray.length)];
        setGiph(randomGiph);
      });
  }, []);

  let giphySrc
  let giphyAlt

  //setting giphyURL and alt text when giph state is set 
  if (giph.images && giph.images.original) {
    giphySrc = giph.images.original.url
    giphyAlt = giph.title
  };

  // render giphy image
  return (
    <Fragment>
      <img className="giph" src={giphySrc} alt={giphyAlt} />
    </Fragment>
  );
}

export default Giphy