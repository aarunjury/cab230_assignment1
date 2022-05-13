import Spinner from "react-bootstrap/esm/Spinner"

export default function Loading(){
    return(
        <div className="loader-wrapper">
            <Spinner animation="border" />
        </div>
    )
}