import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/contexts/AuthContext";

export default function Logout({ setIsAuth }){
    const { auth, setAuth } = useContext(AuthContext);

    setAuth(false);
    localStorage.removeItem("token", null)
    useNavigate("/");
    // useEffect(() => {
    //     setIsAuth(false);
    //     localStorage.removeItem("token", null)
    //     navigate("/");
    // })
}