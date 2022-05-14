import Volcano from "../components/Volcano"
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container"

// Component for the page that displays a single volcano
export default function VolcanoDetail(props) {
    const [searchParams] = useSearchParams();
    const volcanoId = searchParams.get("id");
    return (
        <div className="VolcanoDetail">
            <br></br>
            <Container>
                <Volcano id={volcanoId} isLoggedIn={props.isLoggedIn} />
            </Container>
        </div>
    )
}