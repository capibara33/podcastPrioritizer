import { FaWalking, FaBicycle } from 'react-icons/fa'
import timeConverter from '../utilities/timeConverter'

const TransportationMode = () => {

    console.log(timeConverter(600000));

    return (
        <div className="wrapper transportationContainer">
            <p>Suggested Mode of Transporation</p>
            <div className="transportIconContainer">
                <FaWalking />
                <p>Walking Time</p>
                <FaBicycle />
                <p>Biking Time</p>
            </div>
        </div>
    )
}




export default TransportationMode;