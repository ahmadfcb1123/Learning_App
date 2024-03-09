  import { useRef, useState, useEffect } from 'react';
  import axios from '../api/axios';
  import { Link, useNavigate } from 'react-router-dom';
  import './sign_in.css';
  import Rive from '@rive-app/react-canvas';
import SignIn from '../components/Header/SignIn';
import { styled } from 'styled-components';

  
const Section = styled.div`

background: white;
}
`;
  const Login = () => {

    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [permission,setPermission] = useState('');
    useEffect(() => {
      emailRef.current.focus();
    }, [])

    useEffect(() => {
      setErrMsg('');
  }, [email, password])

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post('/api/auth/login', 
              JSON.stringify({ email, password }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: false
              }
          );
          const { access_token } = response.data;
          const { user } = response.data;
          const id = user._id;
          const permission = user.permission; 
          setPermission(permission)    
          console.log("dkfbngk   " + permission);
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('parentId', id);
          // localStorage.setItem("access-token", response?.token);
          // console.log(JSON.stringify(response?.data));
          console.log(JSON.stringify(user));
          console.log(JSON.stringify(id));
          console.log(JSON.stringify(localStorage));
          setUser('');
          setPwd('');
          setSuccess(true);
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
          }
          errRef.current.focus();
      }
  }

  const Login_Success =()=>
  {
    navigate ('/childs', {state : {}})
  }


    return (
      <Section>
      {success ? (
        <>
        {permission =="user" ?
          (
            <>
            <h1>Welcome To Dolingo</h1>
            <p style={{color:"gray",textAlign:"center"}}>Choose Child To See his practice OR Make your child Practice English</p>
            <div>
            <SignIn />
            </div>
            <section className='succes'>
            <div>
              <Link style={{color:"white" , textDecoration: "none" ,color: "white",margin: "0 auto"}} to="/childRegister">Log As A Child</Link>
            </div>
            <div>
              <Link style={{color:"white" , textDecoration: "none" ,color: "white",margin: "0 auto"}} to="/childs">Childreen Practice</Link>
            </div>
            </section>

            </>
          ):
          (
            <>
              {navigate('/admin')}          
            </>
          )}
        </>
      ) : (
            <section style={{backgroundColor:"white"}}>
                <div className="register">
                    <div className="columon-1">
                        <h2 style={{textAlign: "center" ,color: "green"}}>Login</h2>
                        <span>register and enjoy the service</span>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form id='form' className='flex flex-col' onSubmit={handleSubmit}>

                        <label htmlFor="email">Email:</label>
                        <input
                              type="text"
                              id="email"
                              ref={emailRef}
                              autoComplete="off"
                              onChange={(e) => setUser(e.target.value)}
                              value={email}
                              required
                          />

                          <label htmlFor="password">Password:</label>
                          <input
                              type="password"
                              id="password"
                              onChange={(e) => setPwd(e.target.value)}
                              value={password}
                              required
                          />
                          <button className='btn'>Login</button>
                        </form>
                        <p>
                          Do you have any account?
                          <span className="line">
                              {/*put router link here*/}
                              <Link to="/register">Sign Up</Link>
                          </span>
                        </p>

                    </div>
                    
                </div>
                <div className="columon-2">
                        <img src="/img/backgr.jpg" alt="" />
                    </div>
            </section>
      )}
      </Section>
    )
  }

  export default Login;


  