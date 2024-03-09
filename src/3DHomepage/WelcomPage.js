import styled from "styled-components";
import Hero from "./Hero";
import GetStarted from "./GetStarted";


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

function WelcomPage() {
  return (
    <Container>
      <GetStarted />
    </Container>
  );
}

export default WelcomPage;