import { useEffect, useState } from 'react'

const Giphy = () => {

    const [giph, setGiph] = useState([]);
    
    useEffect(()=>{
        const giphyUrl = new URL(`https://api.giphy.com/v1/gifs`);
        
        giphyUrl.search = new URLSearchParams({
            api_key: 'HVo4BiCuwH7vyhWSzlAfRqhIp06cIt7O',
            ids: 'XeGljuPcbTPtfEwQVo, gFfd9ZgyukhImSYwPa, poqFvVAbhzqwrYqfSG,cIhkizr8QLITdoWSzC,ifGVZZ9QEEMs1ia0OJ,s9vFiYCdomuycLyT1X'
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

    if (giph.images && giph.images.original) {
        giphySrc = giph.images.original.url
        giphyAlt = giph.title
    };

    return (
        <>
            <img className="giph" src={giphySrc} alt={giphyAlt} />
        </>
    );
}

export default Giphy