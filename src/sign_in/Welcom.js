import React from 'react';
import { Link } from 'react-router-dom';

const Welcom = () => {
  return (

    <section className='succes'>
    <h1>You are logged in!</h1>
    <br />
    <p>
    <Link to ="/home">Get Started</Link>
    </p>
    <div>
      <h1>Do you want to Regiser your Son </h1>
      <Link to="/childRegister">register your son</Link>
    </div>
    <div>
      or you want to see what his doing
      <Link to="/chapterPractice">let's see</Link>
    </div>
</section>
  );
}

export default Welcom;
