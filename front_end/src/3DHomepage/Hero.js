import React, { Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #290c0c;  
  background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Footer = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
align-items: flex-start;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 60px;

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;


const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 2px;
`;

const Subtitle = styled.h2`
  color: #da4ea2;
`;

const Desc = styled.p`
  font-size: 24px;
  color: ghostwhite;
  margin-left: 100px;
  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
    }
`;

const Button = styled.button`
  background: #8800f3;
  color: white;
  font-weight: 500;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 100px;

`;

const Right = styled.div`
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const Img = styled.img`
  width: 800px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 1s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(25px);
    }
  }
`;

const Hero = () => {
  const navigate = useNavigate();

  const ToRegiter=()=>
  {
    navigate('/register');
  }

  const ToLogin=()=>
  {
    navigate('/login');
  }
  return (
    <Section>
      <Container>
        <Left>
          <Title>Think. Make. Solve.</Title>
          <Desc>
            Where minds grow and dreams take flight
          </Desc>
        </Left>
        <Right>
          <Img src="./img/moon.png" />
        </Right>
      </Container>
      <Footer>
        <div style={{marginRight:'40px'}}>
          <p>
            do you want to create new account?
          </p>
          <Button onClick={ToRegiter()}>
          <Link style={{color:"white", textDecoration:"auto",margin:"0 auto"}} to={'/register'}>Sign Up</Link>
          </Button>
        </div>
      <div>
      <p>or do you have an account befor?</p>
      <Button onClick={ToLogin()}>
      <Link style={{color:"white",textDecoration:"auto",margin:"0 auto"}} to={'/login'}>Login</Link>        
      </Button>
      </div>
      </Footer>
    </Section>
  );
};

export default Hero;