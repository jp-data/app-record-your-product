import { useNavigate } from "react-router-dom"

export function Logout() {
    const navigate = useNavigate()


    function logout() {
        localStorage.removeItem('token')
        window.location.reload()
        navigate('/sign-in')

    }

    return (
        <div>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
}