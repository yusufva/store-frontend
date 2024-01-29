import InputForm from "../Elements/Input/Index";
import Button from "../Elements/Button/Index";
import { useEffect, useRef, useState } from "react";
import { login } from "../../services/auth.service";
import { useCookies } from "react-cookie";

const FormLogin = () =>{
    const [loginFailed, setLoginFailed] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies()
    const handleLogin = (event) =>{
        event.preventDefault();
        // localStorage.setItem("email", event.target.email.value);
        // localStorage.setItem("password", event.target.password.value);
        // window.location.href = "/products";
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        login(data, (status, res)=>{
            if(status){
                setLoginFailed("")
                setCookie("token", res.token, {maxAge: 3*60*60});
                window.location.href = "/products";
            } else{
                setLoginFailed(res.response.data)
            }
        })

    }

    const usernameRef = useRef(null);

    useEffect(()=>{
        usernameRef.current.focus()
    }, [])

    return (
        <form onSubmit={handleLogin}>
            <InputForm label="Username" type="text" placeholder="JohnDoe" name="username" ref={usernameRef} />
            <InputForm label="Password" type="password" placeholder="********" name="password" />
            {loginFailed && <p className="text-red-500 text-center mb-5">{loginFailed}</p>}
            <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
        </form>
    )
}

export default FormLogin;