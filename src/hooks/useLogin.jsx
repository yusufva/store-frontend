import { useEffect, useState } from "react"
import { getUsername } from "../services/auth.service"
import { useCookies } from "react-cookie";

export const useLogin = () => {
    const [username, setUsername] = useState('')
    const [cookies] = useCookies(['token'])
    const token = cookies.token
    useEffect(() => {
        token ? setUsername(getUsername(token)) : window.location.href = '/login'
    }, [token])

    return username;
}