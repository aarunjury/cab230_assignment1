import Spinner from "react-bootstrap/esm/Spinner"

// Loading spinner - has custom CSS to takeover screen
export default function Loading(){
    return(
        <div className="loader-wrapper">
            <Spinner animation="border" />
        </div>
    )
}