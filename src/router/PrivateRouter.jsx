import { useSelector } from "react-redux";

export default function PrivateRouter(props) {
    var token = useSelector(state => state.auth.token)

    if (token) {
        return props.children
    } else {
        alert('Bạn chưa đăng nhập')
        window.location.href = '/login'
    }
}