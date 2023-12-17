import { useDispatch } from "react-redux"
import { LogoutRedux } from "../redux/Auth"

const Logout = () => {
    const dispatch = useDispatch()
    return (
        <>
            <button type="button" className="btn btn-outline-primary ms-auto" onClick={() => {
                dispatch(LogoutRedux())
            }}>
                <span className="fa fa-sign-out me-1"></span>Logout
            </button>
        </>
    )
}

export default Logout