import { FaWalking, FaBicycle } from 'react-icons/fa'


const TransportationMode = () => {
    return (
        <div className="transportationContainer">
            <p>Suggested Mode of Transporation</p>
            <div>
                <FaWalking />
                <FaBicycle />
            </div>
        </div>
    )
}




export default TransportationMode;