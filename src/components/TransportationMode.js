import { FaWalking, FaBicycle } from 'react-icons/fa'
import timeConverter from '../utilities/timeConverter'

const TransportationMode = ({ setMapData }) => {

    // console.log(setMapData[0].realTime);
    // console.log(setMapData[1].realTime);
 
    // let pedestrianTime = timeConverter(setMapData[0].realTime)
    // let bikeTime = timeConverter(setMapData[1].realTime)
    // console.log(pedestrianTime);
    
    // {setMapData[0] ? setMapData[0].realTime : null};
    // {setMapData[1] ? setMapData[1].realTime : null};

    if (setMapData[0] && setMapData[1]) {
      return (
        <div className="wrapper transportationContainer">
        <p>Suggested Mode of Transporation</p>
        <div className="transportIconContainer">
          <div>
            <FaWalking />
            <p>Walking Time {setMapData[0].realTime}</p>
            {/* <p>Walking Distance {bike}</p> */}
          </div>
          <div>
            <FaBicycle />
            <p>Biking Time {setMapData[1].realTime}</p>
            {/* <p>Biking Distance {distance}</p> */}
          </div>
        </div>
    </div>
      )
    } else {
      return null;
      // (
      //   <div className="transportIconContainer">
      //     <div>
      //       <FaWalking />
      //     </div>
      //     <div>
      //       <FaBicycle />
      //     </div>
      //   </div>
      // )
    }
  
}



export default TransportationMode;