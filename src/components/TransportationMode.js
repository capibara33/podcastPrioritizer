import { FaWalking, FaBicycle } from 'react-icons/fa'


const TransportationMode = () => {
    return (
        <div className="wrapper transportationContainer">
            <p>Suggested Mode of Transporation</p>
            <div className="transportIconContainer">
                <FaWalking />
                <FaBicycle />
            </div>
        </div>
    )
}




export default TransportationMode;