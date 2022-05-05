import Volcano from "../components/Volcano"
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container"

export default function VolcanoDetail(props) {
    const [searchParams] = useSearchParams();
    const volcanoId = searchParams.get("id");
    return (
        <div className="VolcanoDetail">
            <br></br>
            <Container>
                <Volcano id={volcanoId} isAuth={props.isAuth} />
            </Container>
        </div>
    )
}