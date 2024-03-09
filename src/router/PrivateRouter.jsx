import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

export default function PrivateRouter(props) {
    var token = useSelector(state => state.auth.token)

    if (token) {
        return props.children
    } else {
        return <Navigate to='/'></Navigate>
    }
}