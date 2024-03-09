import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import WelcomPage from "../3DHomepage/WelcomPage";



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const LASTNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const CODE_REGEX = /^.{8,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const StudentRegister =() =>
{

  const userRef = useRef();
  const errRef = useRef();

  const parentId = localStorage.getItem('parentId');
  // const parentId = "64c120d393120000ea006ec2";



  const [Firstname, setUser] = useState('');
  const [validFirstname, setValidFirstname] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [Lastname, setName] = useState('');
  const [validLastname, setValidLastname] = useState(false);
  const [LastnameFocus, setLastnameFocus] = useState(false);

  const [password, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [code, setCode] = useState('');
  const [validCode, setValidCode] = useState(false);
  const [codeFocus, setCodeFocus] = useState(false);

  const [password_confirmation, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === password_confirmation);
}, [password,password_confirmation])

  useEffect(() => {
    setValidFirstname(USER_REGEX.test(Firstname));
}, [Firstname])

useEffect(() => {
  setValidLastname(LASTNAME_REGEX.test(Lastname));
}, [Lastname])

useEffect(() => {
setValidCode(CODE_REGEX.test(code));
}, [code])


  useEffect(() => {
      setErrMsg('');
  }, [Firstname,Lastname,code,password,password_confirmation])


  const handleSubmit = async (event) => {
      event.preventDefault();


      try {
        const response = await axios.post('/api/auth/registerChild',
            JSON.stringify({Firstname,code,Lastname,password,parentId}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
                Authorization : 'Bearer' + localStorage.getItem('access_token'),
            }
        );

        const {data} = response.data;
        const id = data[0]._id;
        localStorage.setItem('studentId', id);
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response))
        setSuccess(true);
        setUser('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
    }
}

    
  return (
    <>
        {success ? (
          <div className='simpleContainer'>
            <WelcomPage />
          </div>
        ) : (
      <section> 
          <div className="register">
              <div className="columon-1">
                  <h2>Sign Up</h2>
                  <span>let's creat your account </span>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                  <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="name">
                            First name:
                            <FontAwesomeIcon icon={faCheck} className={validFirstname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstname || !Firstname ? "hide" : "invalid"} />
                    </label>
                      <input 
                        type="text" 
                        id="name"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={Firstname}
                        required
                        aria-invalid={validFirstname ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />                    
                    <p id="uidnote" className={userFocus && Firstname && !validFirstname? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.<br />
                      Must begin with a letter.<br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="lastname">
                            Last name:
                            <FontAwesomeIcon icon={faCheck} className={validLastname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLastname || !Lastname ? "hide" : "invalid"} />
                    </label>
                      <input 
                        type="text" 
                        id="lastname"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={Lastname}
                        required
                        aria-invalid={validLastname ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setLastnameFocus(true)}
                        onBlur={() => setLastnameFocus(false)}
                    />                    
                    <p id="uidnote" className={LastnameFocus && Lastname && !validLastname? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.<br />
                      Must begin with a letter.<br />
                      Letters, numbers, underscores, hyphens allowed.
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
                      <button disabled={!validFirstname || !validCode || !validLastname || !validPwd? true : false} className='btn'>Sign Up</button>
                      <p>
                        Already registered?<br />
                        <span className="line">
                          <Link to="/childLogin">sign in </Link>
                        </span>
                    </p>
                  </form>
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

export default StudentRegister ;
