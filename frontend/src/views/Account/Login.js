import React, { useState } from "react";
import '../../styles/loginstyle.scss';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logo.jpg';
import { FaArrowRight, FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import handleLoginAPI from "../../services/LoginServices";
import jwt_decode from "jwt-decode";
function Login() {
    const [eye, setEye] = useState(false);
    const changeIconEye = () => setEye(!eye);
    const [account, setAccount] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState({
        errmess: "",
    });
    const { username, password } = account;
    const currentUrl = window.location.href; // lấy URL hiện tại của trang

    const changeHandler = (e) => {
        setErr({
            errmess: "",
        })
        const { id, value } = e.target
        setAccount(prevState => ({
            ...prevState,
            [id]: value
        }
        ))
    }

    const callAPIlogin = async () => {
        try {
            let a = await handleLoginAPI(account);
            if (a && !err.errmess) {
                // sessionStorage.setItem('user', JSON.stringify(a));
                // var decoded = jwt_decode(a); /
                // console.log(decoded);
                window.location.href = "/";
            }
            else {
                console.log("xuống đây r nẻ2");
            }
            // const a = JSON.parse(sessionStorage.getItem('a'));
        } catch (error) {
            setErr({
                errmess: "The username or password you entered is incorrect!!!!!!!!!!"
            })
        }
    }
    const HandlerSubmit = (e) => {
        setErr({
            errmess: "",
        })
        e.preventDefault();
        if (!account.username || !account.password) {
            toast.error("Missing ! Please fill in the missing information.");
            return;
        }
        callAPIlogin();
    }

    return (
        <div className="body_login">
            <div className="container_login">
                <div className="screen">
                    <div className="screen__content">
                        <div className="Login_text_top">
                            <h1>Login Account</h1>
                        </div>
                        <form className="login" onSubmit={HandlerSubmit}>
                            <div className="login__field">
                                <i className="login__icon"><FaUser /></i>
                                <input id="username" type="text" className="login__input" placeholder="Username" value={username} onChange={changeHandler} autoComplete="off" />
                            </div>
                            <div className="login__field">
                                <i className="login__icon"><FaLock /></i>
                                <input id="password" type={eye ? "text" : "password"} className="login__input" placeholder="Password" value={password} onChange={changeHandler} required />
                                <span
                                    onClick={changeIconEye}
                                > {eye ? <i style={{ cursor: "pointer" }}><FaEye /></i> : <i style={{ cursor: "pointer" }}><FaEyeSlash /></i>}</span>
                            </div>
                            <div>
                                <p style={{ color: "red" }} >{err.errmess}</p>
                            </div>
                            <button name="submit" className="button login__submit" onClick={HandlerSubmit} >
                                <span className="button__text">Log In Now </span>
                                <i><FaArrowRight /></i>
                            </button>
                        </form>
                        <div className="social-login">
                            <img src={logo} />
                        </div>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </ div>
    )
}
export default Login;

