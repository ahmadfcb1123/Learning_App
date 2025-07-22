import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import SignIn from "../components/Header/SignIn";



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Email_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_REGEX = /^.{8,}$/;

const Register =() =>
{

  const userRef = useRef();
  const errRef = useRef();

  const [name, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [code, setCode] = useState('');
  const [validCode, setValidCode] = useState(false);
  const [codeFocus, setCodeFocus] = useState(false);

  const [password, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [password_confirmation, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
}, [name])

useEffect(() => {
  setValidEmail(Email_REGEX.test(email));
}, [email])

useEffect(() => {
setValidCode(CODE_REGEX.test(code));
}, [code])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(password));
      setValidMatch(password === password_confirmation);
  }, [password, password_confirmation])

  useEffect(() => {
      setErrMsg('');
  }, [name, password, password_confirmation , code , email])


  const handleSubmit = async (event) => {
      event.preventDefault();


      try {
        const response = await axios.post('/api/auth/register',
            JSON.stringify({name,email,password,code,password_confirmation}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        );
        console.log(response?.data);  
        console.log(response?.accessToken);
        console.log(JSON.stringify(response))
        setSuccess(true);
        setUser('');
        setPwd('');
        setMatchPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Username Taken')
        }
        errRef.current.focus();
    }
}
const navigate = useNavigate();
    
  return (
    <>
        {success ? (
        <>
          {navigate ('/login')}
        </> 
        ) : (
      <section> 
          <div className="register">
              <div className="columon-1">
                  <h2>Sign Up</h2>
                  <span>let's creat your account </span>
{/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
                  {
                    errMsg==='' ?(
                      <Alert severity="info">Pleas fill all of this fields</Alert>
                    ) :(
                  <Alert severity="error">{errMsg}</Alert>
                    )
                  }

                  <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="name">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                    </label>
                      <input 
                        type="text" 
                        id="name"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={name}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && name && !validName ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.<br />
                      Must begin with a letter.<br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor="email">
                          Email:
                          <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input
                          type="text"
                          id="email"
                          autoComplete="off"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                          aria-invalid={validEmail ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                    />
                    <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        should not contain whitespace characters.<br />
                        should have at least one character before and after the "@" symbol.<br/>
                        should have a period (dot) symbol after the "@" symbol.
                    </p>
                    <label htmlFor="code">
                          Code:
                          <FontAwesomeIcon icon={faCheck} className={validCode ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validCode || !code ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="code"
                          autoComplete="off"
                          onChange={(e) => setCode(e.target.value)}
                          value={code}
                          required
                          aria-invalid={validCode ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setCodeFocus(true)}
                          onBlur={() => setCodeFocus(false)}
                      />
                      <p id="uidnote" className={codeFocus && code && !validCode ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          invalid Code <br />
                          should be more than 8 
                      </p>
                      <label htmlFor="password">
                          Password:
                          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={password}
                          required
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                      />
                      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
                      <label htmlFor="confirm_pwd">
                          Confirm Password:
                          <FontAwesomeIcon icon={faCheck} className={validMatch && password_confirmation ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validMatch || !password_confirmation ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="confirm_pwd"
                          onChange={(e) => setMatchPwd(e.target.value)}
                          value={password_confirmation}
                          required
                          aria-invalid={validMatch ? "false" : "true"}
                          aria-describedby="confirmnote"
                          onFocus={() => setMatchFocus(true)}
                          onBlur={() => setMatchFocus(false)}
                      />
                      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Must match the first password input field.
                      </p>
                      <button disabled={!validName || !validPwd || !validMatch ? true : false} className='btn'>Sign Up</button>
                      </form>
                      <p>
                        Already registered?<br />
                        <span className="line">
                        <Link to="/login">Sign In</Link>
                        </span>
                    </p>                  
              </div>
          </div>
          <div className="columon-2">
                        <img src="/img/backgr.jpg" alt="" />
          </div>
      </section>
        )}
    </>
  )
}

export default Register ;
