import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import Services from "../src/components/Services";
import About from "../src/components/About";
import Testimonials from "../src/components/Testimonials";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-sans scroll-smooth">
      <Header /> 
      
      <div id="home">
        <Hero />
      </div>

      {/* IDs ESSENCIAIS PARA O MENU FUNCIONAR */}
      <div id="servicos">
        <Services />
      </div>
      
      <div id="sobre">
        <About />
      </div>
      
      <div id="depoimentos">
        <Testimonials />
      </div>
      
      <div id="contato">
        <Contact />
      </div>
      
      <Footer />
    </main>
  );
}