import { useLogin } from "../hooks/useLogin"

const ProfilePages = () => {
    const username = useLogin()
    return (
        <div>
            <h1>Profile {username}</h1>
        </div>
    )
}

export default ProfilePages