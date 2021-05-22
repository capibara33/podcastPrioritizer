import { FaWalking, FaBicycle } from 'react-icons/fa'
import timeConverter from '../utilities/timeConverter'

const TransportationMode = ({ setMapData }) => {
    // if (! location) {
    //   return
    // } 
    // let walk = {};
    // let bike = {};
    // // setMapData[0].realTime;
    // // setMapData[1].realTime;
    // if (setMapData[0] && setMapData[1]) {
    //   walk = setMapData[0];
    //   bike = setMapData[1];
    // }
    
    // let pedestrianTime = timeConverter(setMapData[0].realTime)
    // let bikeTime = timeConverter(setMapData[1].realTime)
    // console.log(pedestrianTime);



    return (
        <div className="wrapper transportationContainer">
            <p>Suggested Mode of Transporation</p>
            <div className="transportIconContainer">
              <div>
                <FaWalking />
                {/* <p>Walking Time {pedestrianTime}</p> */}
                {/* <p>Walking Distance {bike}</p> */}
              </div>
              <div>
                <FaBicycle />
                {/* <p>Biking Time {bikeTime}</p> */}
                {/* <p>Biking Distance {distance}</p> */}
              </div>
            </div>
        </div>
    )
}



export default TransportationMode;