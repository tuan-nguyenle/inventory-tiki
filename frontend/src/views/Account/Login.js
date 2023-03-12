import React, { useState } from "react";
import '../../styles/loginstyle.scss';
import logo from '../../assets/images/logo.jpg';
import { FaArrowRight, FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
function Login() {
    const [eye, setEye] = useState(false);
    const changeIconEye = () => setEye(!eye);
    const [account, setAccount] = useState({
        username: "",
        password: "",
    });
    const { username, password } = account;
    const changeHandler = (e) => {
        setAccount({ ...account, [e.target.name]: [e.target.value] });
        // console.log(account)
    }
    const HandlerSubmit = (e) => {
        e.preventDefault();
        console.log(account);
    }
    return (
        <div className="body_login">
            <div className="container_login">
                <div className="screen">
                    <div className="screen__content">
                        <div className="Login_text_top">
                            <h1>Login Account</h1>
                        </div>
                        <form className="login">
                            <div className="login__field">
                                <i className="login__icon"><FaUser /></i>
                                <input name="username" type="text" className="login__input" placeholder="Username" value={username} onChange={changeHandler} />
                            </div>
                            <div className="login__field">
                                <i className="login__icon"><FaLock /></i>
                                <input name="password" type={eye ? "text" : "password"} className="login__input" placeholder="Password" value={password} onChange={changeHandler} />
                                <span
                                    onClick={changeIconEye}
                                > {eye ? <i style={{ cursor: "pointer" }}><FaEye /></i> : <i style={{ cursor: "pointer" }}><FaEyeSlash /></i>}</span>
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

