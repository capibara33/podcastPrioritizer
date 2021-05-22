import { FaWalking, FaBicycle } from 'react-icons/fa'
import timeConverter from '../utilities/timeConverter'

const TransportationMode = ({ setMapData }) => {

    console.log(setMapData);
    // console.log('location: ', handleLocationData);
    // console.log('destination: ', handleDestinationData);
    // console.log(timeConverter(600000));

    return (
        <div className="wrapper transportationContainer">
            <p>Suggested Mode of Transporation</p>
            <div className="transportIconContainer">
              <div>
                <FaWalking />
                <p>Walking Time</p>
                <p>Walking Distance</p>
              </div>
              <div>
                <FaBicycle />
                <p>Biking Time</p>
                <p>Biking Distance</p>
              </div>
            </div>
        </div>
    )
}




export default TransportationMode;