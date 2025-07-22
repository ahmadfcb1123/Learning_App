import styled from "styled-components";
import Hero from "./Hero";
import { Link } from "react-router-dom";


const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: #070707;
  &::-webkit-scrollbar{
    display: none;
  }
`;

function HomePage() {
  return (
    <Container>
      <Hero />
      <Link to="http://127.0.0.1:5500/demos/objectManip3/index.html">hkgfvytfvyg</Link>
    </Container>
  );
}

export default HomePage;