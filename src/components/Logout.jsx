import { useDispatch } from "react-redux"
import { LogoutRedux } from "../redux/Auth"
import { Button } from 'antd';

const Logout = () => {
    const dispatch = useDispatch()
    return (
        <>
            <Button type="primary" onClick={() => {
                dispatch(LogoutRedux())
            }}>
                LOGOUT
            </Button >
        </>
    )
}

export default Logout