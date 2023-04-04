import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Container maxW="container.xl">
        <Navbar />
        <Hero />
      </Container>
      <Footer />
    </>
  );
}

export default App;
