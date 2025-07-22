import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import WelcomPage from '../3DHomepage/WelcomPage';


const StudentLogin = () => {

  const parentId = localStorage.getItem('parentId');

  const nameRef = useRef();
  const errRef = useRef();

  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [password, setPwd] = useState('');
  const [code, setCode] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
}, [Firstname,code,Lastname,password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('/api/auth/loginChild',
            JSON.stringify({Firstname, code ,Lastname,password,parentId}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
                Authorization : 'Bearer' + localStorage.getItem('access_token'),
            }
        );
        const {data} = response.data;
        const id = data[0]._id;
        const name = data[0].Firstname;
        localStorage.setItem('studentId', id);
        localStorage.setItem('studentName', name);
        console.log(JSON.stringify(response?.data));
        setFirstname('');
        setCode('');
        setLastname('');
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


  return (
    <>
    {success ? (
      <div className='simpleContainer'>
            {/* <section className='training'>
              <h1>Success Login!</h1>
              <h3>
                welcom {localStorage.getItem("studentName")} Here LET'S GO OUR JOURNY
              </h3>
              <Link to="/home">Get Started</Link>
            </section> */}
            <WelcomPage />
      </div>
    ) : (
          <section>
              <div className="register">
                  <div className="columon-1">
                      <h2>Sign In</h2>
                      <span>login your child and let's start</span>
                      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                      <form id='form' className='flex flex-col' onSubmit={handleSubmit}>

                      <label htmlFor="name">First name:</label>
                      <input
                            type="text"
                            id="name"
                            ref={nameRef}
                            autoComplete="off"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={Firstname}
                            required
                        />
                      <label htmlFor="last_name">Last name:</label>
                      <input
                            type="text"
                            id="last_name"
                            autoComplete="off"
                            onChange={(e) => setLastname(e.target.value)}
                            value={Lastname}
                            required
                        />                        
                        <label htmlFor="code">code:</label>
                        <input
                            type="password"
                            id="code"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
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


                        <button className='btn'>Sign In</button>
                      </form>
                      <p>
                        Do you have any account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to={'/childRegister'}>Sign up</Link>
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

export default StudentLogin;
